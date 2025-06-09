import { Types } from "mongoose"

export class ReviewAggregation {
    static async match(id: Types.ObjectId) {
        try {
            return {
                $match: {
                    book_id: id,
                }
            }
        } catch (error) {
            throw error
        }
    }

    static async project_data() {
        try {
            return {
                $project: {
                    _id: 1,
                    rating: 1,
                    comment: 1,
                    user_id: 1,
                    created_at: 1,
                }
            }
        } catch (error) {
            throw error
        }
    }

    static async facet_data(skip: number, limit: number) {
        try {
            return {
                $facet: {
                    metadata: [
                        {
                            $group: {
                                _id: null,
                                avgRating: { $avg: "$rating" },
                                total: { $sum: 1 }
                            }
                        }
                    ],
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ]
                }
            }
        } catch (error) {
            throw error
        }
    }

    static async unwind_metadat() {
        try {
            return {
                $unwind: {
                    path: "$metadata",
                    preserveNullAndEmptyArrays: false,
                }
            }
        } catch (error) {
            throw error
        }
    }

     static async final_data() {
        try {
            return {
                $project: {
                    data: 1,
                    avg_rating: "$metadata.avgRating"
                    
                }
            }
        } catch (error) {
            throw error
        }
    }
}