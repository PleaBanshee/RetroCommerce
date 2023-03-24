const { validate } = require("../models/product");

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // ternary operator
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            } :
            {};

        // console.log(keyword);
        this.query = this.query.find({...keyword });
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr };

        // remove fields from query string
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);

        // advanced filtering for price, ratings etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // GET --- /api/v1/products?page=4
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;