import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

//todo Define attributes for the Review model
interface ReviewAttributes {
  id: number; //todo Unique identifier for each review
  comment: string; //todo Text content of the review
  star_review: number; //todo Star rating given in the review (e.g., 1-5)
  userId: number; //todo Foreign key reference to User model
}

//todo Define attributes required for creating a new review
//todo 'id' is optional since it will be auto-generated by the database
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

//todo Define the Review model class with Sequelize
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number; 
  public comment!: string; 
  public star_review!: number; 
  public userId!: number; 

  //todo Sequelize automatically manages timestamps
  public readonly createdAt!: Date; //todo Timestamp when the review was created
  public readonly updatedAt!: Date; //todo Timestamp when the review was last updated
}

//todo Function to define and initialize the Review model with Sequelize
export function ReviewFactory(sequelize: Sequelize): typeof Review {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER, //todo Integer type for the ID
        autoIncrement: true, //todo Auto-increments with each new entry
        primaryKey: true, //todo Marks 'id' as the primary key
      },
      comment: {
        type: DataTypes.STRING, //todo Stores the text of the review
        allowNull: false, //todo Comment field is required
      },
      star_review: {
        type: DataTypes.INTEGER, //todo Stores the star rating (integer)
        allowNull: false, //todo Rating is required
      },
      userId: {
        type: DataTypes.INTEGER, //todo Foreign key referencing 'users' table
        allowNull: false, //todo userId is required for associating reviews with users
        references: {
          model: 'users', // todo Links to the 'users' table
          key: 'id', //todo  References the 'id' column in 'users'
        },
        onUpdate: 'CASCADE', //todo If a user ID is updated, update related reviews
        onDelete: 'CASCADE', //todo If a user is deleted, delete related reviews
      },
    },
    {
      tableName: 'review', //todo Sets the table name in the database
      sequelize, //todo Passes the Sequelize instance for initialization
      timestamps: true, //todo Enables automatic timestamps (createdAt, updatedAt)
    }
  );

  return Review; //todo Returns the initialized model
}
