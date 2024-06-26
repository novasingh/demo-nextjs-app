import { fetchAPI } from "@/utils/api";

// GET HANDLER TO USE THE CREATE USER , POST & COMMENT
export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const apiRes = await fetchAPI(url);
    res.status(200).json(apiRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
