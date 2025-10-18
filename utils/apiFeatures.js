class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
      // 1A) Filtering
      const queryObj = { ...this.queryString };
      const excludedFields = ['sort', 'page', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);

      // 1B) Advanced Filtering - CORRECTED
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      
      const finalQueryObj = JSON.parse(queryStr);

      this.query = this.query.find(finalQueryObj);
      return this;

    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
          this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
          // excluding
          this.query = this.query.select('-__v')
        }
        return this;
    }

    paginate() {
        // 4) Pagination
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        
        return this;
    }
}

module.exports = APIFeatures;