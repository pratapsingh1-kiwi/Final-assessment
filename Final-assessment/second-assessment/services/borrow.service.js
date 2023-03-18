const book = require("../model/book");
const borrowerModel = require("../model/borrower.model");
const datefns = require("date-fns")
module.exports = {
  borrowBook: async (req, res) => {
    const bookId = req.body.bookId;
try {
  const [docA, docB, docC] = await Promise.all([
 book.updateOne(
    { _id: bookId },
      { $inc: { issued: 1 } },
    { new: true }
  ),
  book.updateOne(
    { _id: bookId },
      { $inc: { available: -1 } },
    { new: true }
  ),
 new borrowerModel({
    email: req.body.email,
    userId: req.body.userId,
    bookId: req.body.bookId,
  }).save()
]);
  return ({ docA, docB, docC });
} catch (err) {
  return err;
}
},
  findPurchaseBookById: async (req) => {
    try {
      const obj = await borrowerModel.findOne({ bookId: req.body.bookId });
      return obj;
    } catch (e) {
      return e;
    }
  },
  dayslefttosubmit: async() => {
    try {
      const date = new Date();
      const obj = await borrowerModel.findOne({ _id: req.body.bookId });
      const daysleft = datefns.differenceInDays(obj.returnDate, date)
      return daysleft;
    } catch (e) {
      return e;
    }
  },
  findAllPurchasedBooks: async (next) => {
    try {
      const obj = await borrowerModel.find();
      return obj;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  updateBorrowerBook: async (req) => {
    try {
      const obj = await borrowerModel.findOneAndUpdate(
        { bookId: req.body.bookId },
        {
          $set: {
            email: req.body.email,
            userId: req.body.userId,
            bookId: req.body.bookId,
            purchaseDate: req.body.purchaseDate,
          },
        }
      );
      return obj;
    } catch (e) {
      return e;
    }
  },
  singleBook: async (req, res) => {
    try {
      const bookId = req.body.bookId;
      const details = await borrowerModel
        .findOne({ bookId })
        .populate("bookId");
      return res.send(details);
    } catch (e) {
      return e;
    }
  },
  allBooks: async ( ) => {
    try {
      const details = await borrowerModel.find().populate("userId");
      for (let i = 0; i <details.length; i++) {
        for (let j = 0; j < (details.length - i - 1); j++) {
        if (details[j].userId.name >details[j + 1].userId.name) {
          const temp =details[j];
        details[j] =details[j + 1];
          details[j + 1] = temp;
        }
      }
    }
      return (details);
    } catch (e) {
      return e;
    }
  },
  blacklistedUsers: async ( ) => {
    try {
      const details = await borrowerModel.find().populate("userId");
      const ans= [];
      const date = new Date();
      for(let i =0; i<details.length;i++){
        const Dayleft = datefns.differenceInDays(details[i].returnDate, date);
        if(Dayleft<0){
          ans.push(details[i]);
        }
      }
      const csvData = ans.map((row) => `${`'Id = '${row._id} `},${`'Email = '${row.email} `},${`'Name = '${row.userId.name} `},${`'Batch = '${row.userId.batch} `},${`'Enrollment_no = '${row.userId.enrollment_no} `},${`'Total = '${ans.length} `}`).join('/n');
      fs.writeFile('data.csv', csvData, (err) => {
        if (err) throw err;
        console.log('File has been created');
      });
      return {
        total: ans.length,
        blackListStudent: ans,
      };
    } catch (e) {
      return e;
    }
  },
};
