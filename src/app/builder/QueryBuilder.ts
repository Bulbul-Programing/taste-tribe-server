import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  searching(searchAbleFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields: string[] = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minValue',
      'maxValue',
      'upcoming'
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sorts: string =
      (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sorts);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  priceFilter() {
    const minValue = this.query.minValue ? Number(this.query.minValue) : null;
    const maxValue = this.query.maxValue ? Number(this.query.maxValue) : null;

    const priceFilter = {
      pricePerHour: {
        $gte: minValue,
        $lte: maxValue,
      },
    };

    if (minValue !== null || maxValue !== null) {
      this.modelQuery = this.modelQuery.find(priceFilter);
    }
    return this;
  }
  futureField() {
    const upcoming = this?.query?.upcoming;
    const todayDate = new Date().toISOString().slice(0, 10);
    if (upcoming === 'true') {
      const bookingFilter = {
        date: {
          $gte: todayDate,
        },
      };
      this.modelQuery = this.modelQuery.find(bookingFilter);
      return this;
    }
    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;

