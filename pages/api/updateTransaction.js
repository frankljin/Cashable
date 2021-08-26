import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";
const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { account } = req.query;
  const query = { account: account };
  let doc = await req.db.collection("transactions").updateOne(query, {"$push": {"transactions": {...req.body, id: ObjectId()}}})
  res.json(doc);
});

export default handler;
