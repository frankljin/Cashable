import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  const query = { _id: ObjectId(id) };
  let doc = await req.db.collection("accounts").findOne(query);
  res.json(doc);
});

handler.put(async (req, res) => {
  const { id } = req.body;
  const query = { _id: ObjectId(id) };
  let doc = await req.db
    .collection("accounts")
    .findOneAndUpdate(query, { $set: { total: req.body.total } });
  res.json(doc);
});

export default handler;
