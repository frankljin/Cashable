import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  const query = { sub: id };
  let doc = await req.db.collection("budgets").find(query).toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  let doc = await req.db.collection("budgets").insertOne(req.body);
  res.json(doc);
});

handler.put(async (req, res) => {
  const { id } = req.body;
  const query = { _id: ObjectId(id) };
  let doc = await req.db
    .collection("budgets")
    .findOneAndUpdate(query, { $set: { spent: req.body.spent } });
  res.json(doc);
});

// handler.delete(async (req, res) => {
//   const { id } = req.query;
//   const query = { sub: id };
//   let doc = await req.db.collection("accounts")
// })
export default handler;
