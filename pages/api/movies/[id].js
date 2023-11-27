import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movie = await db.collection("movies").findOne({
      _id: ObjectId(id),
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie.title);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
