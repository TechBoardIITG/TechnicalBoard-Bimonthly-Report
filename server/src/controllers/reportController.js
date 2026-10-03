import jwt from 'jsonwebtoken';
import { Report } from '../models/Report.js';
import { Review } from '../models/Review.js';

const JWT_SECRET = process.env.JWT_SECRET || 'technical_board_spr_jwt_secret_2026';

// GET all reports with optional filters
export const getReports = async (req, res) => {
  try {
    const { domain, status, search } = req.query;
    const filter = {};

    if (domain) {
      filter.domain = domain;
    }

    if (status) {
      if (status === 'reviewed') {
        filter.reviewed = true;
      } else {
        filter.status = status;
      }
    }

    if (search) {
      filter.$or = [
        { reportId: { $regex: search, $options: 'i' } },
        { club: { $regex: search, $options: 'i' } },
        { clubName: { $regex: search, $options: 'i' } },
        { secretary: { $regex: search, $options: 'i' } },
      ];
    }

    const reports = await Report.find(filter).sort({ updatedAt: -1 });
    
    // Fetch all reviews to join reviewed state accurate
    const reviews = await Review.find({}, 'reportId updatedAt');
    const reviewMap = new Map(reviews.map((r) => [r.reportId, r]));

    const populatedReports = reports.map((rep) => {
      const doc = rep.toObject();
      const hasReview = reviewMap.has(doc.reportId);
      return {
        ...doc,
        reviewed: hasReview,
        reviewUpdatedAt: hasReview ? reviewMap.get(doc.reportId).updatedAt : null,
      };
    });

    res.json({ success: true, count: populatedReports.length, reports: populatedReports });
  } catch (error) {
    console.error('Error in getReports:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving reports', error: error.message });
  }
};

// GET single report by reportId or Mongo _id
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    let report = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      report = await Report.findById(id);
    }
    if (!report) {
      report = await Report.findOne({ reportId: id });
    }

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    const review = await Review.findOne({ reportId: report.reportId });

    res.json({
      success: true,
      report,
      review: review ? review.review : null,
      reviewDoc: review,
    });
  } catch (error) {
    console.error('Error in getReportById:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving report', error: error.message });
  }
};

// POST / PUT: Save or update a report (Draft or Submitted)
export const saveReport = async (req, res) => {
  try {
    const {
      reportId,
      club,
      clubName,
      domain,
      periodFrom,
      periodTo,
      secretary,
      status = 'draft',
      selfScores = {},
      report = {},
    } = req.body;

    // Verify caller authorization if token is present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded && decoded.role === 'club_secretary' && decoded.clubCode) {
          if (decoded.clubCode.toUpperCase() !== String(club).toUpperCase()) {
            return res.status(403).json({
              success: false,
              message: `Access denied: As ${decoded.clubCode} Secretary, you are only authorized to file reports for ${decoded.clubCode}.`,
            });
          }
        }
      } catch {
        // Token verification failed or expired
      }
    }

    if (!reportId || !club) {
      return res.status(400).json({
        success: false,
        message: 'Report ID and Club code are required',
      });
    }

    const updateData = {
      schema: 'TB/SPR/Revision-01',
      reportId,
      club,
      clubName,
      domain,
      periodFrom,
      periodTo,
      secretary,
      status,
      selfScores,
      report,
      updatedAt: new Date(),
    };

    if (status === 'submitted') {
      updateData.submittedAt = new Date();
    }

    const savedReport = await Report.findOneAndUpdate(
      { reportId },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: status === 'submitted' ? 'Report submitted successfully' : 'Draft saved successfully',
      report: savedReport,
    });
  } catch (error) {
    console.error('Error in saveReport:', error);
    res.status(500).json({ success: false, message: 'Server error saving report', error: error.message });
  }
};

// DELETE a report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await Report.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await Report.findOneAndDelete({ reportId: id });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Also remove associated review
    await Review.deleteMany({ reportId: deleted.reportId });

    res.json({ success: true, message: 'Report deleted successfully', deletedId: deleted.reportId });
  } catch (error) {
    console.error('Error in deleteReport:', error);
    res.status(500).json({ success: false, message: 'Server error deleting report', error: error.message });
  }
};

// GET Review for a report
export const getReview = async (req, res) => {
  try {
    const { reportId } = req.params;
    const reviewDoc = await Review.findOne({ reportId });
    if (!reviewDoc) {
      return res.json({ success: true, review: null });
    }
    res.json({ success: true, review: reviewDoc.review, reviewDoc });
  } catch (error) {
    console.error('Error in getReview:', error);
    res.status(500).json({ success: false, message: 'Server error getting review', error: error.message });
  }
};

// POST Save Council Review
export const saveReview = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { review, club } = req.body;

    if (!reportId || !review) {
      return res.status(400).json({ success: false, message: 'Report ID and Review data are required' });
    }

    const reviewDoc = await Review.findOneAndUpdate(
      { reportId },
      {
        $set: {
          reportId,
          club,
          review,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    // Update the reviewed flag on Report
    await Report.findOneAndUpdate({ reportId }, { $set: { reviewed: true } });

    res.json({ success: true, message: 'Council review saved successfully', reviewDoc });
  } catch (error) {
    console.error('Error in saveReview:', error);
    res.status(500).json({ success: false, message: 'Server error saving review', error: error.message });
  }
};
