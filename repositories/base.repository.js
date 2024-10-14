// repositories/base.repository.js
class BaseRepository {
    constructor(model) {
      this.model = model;
    }
  
    // Get a document by ID
    async getById(id) {
      return this.model.findById(id);
    }
  
    // Get all documents with pagination
    async getAll(page = 1, limit = 10) {
      const skip = (page - 1) * limit;
      const total = await this.model.countDocuments();
      const data = await this.model.find().skip(skip).limit(limit);
      return {
        data,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    }
  
    // Create a new document
    async create(data) {
      const document = new this.model(data);
      return document.save();
    }
  
    // Update an existing document
    async update(id, data) {
      return this.model.findByIdAndUpdate(id, data, { new: true });
    }
  
    // Delete a document by ID
    async delete(id) {
      return this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = BaseRepository;
  