import { fetchAPI } from "@/utils/api";

// GET HANDLER TO USE THE GET USER LISTING WITH PAGINATION
export default async function handler(req, res) {
  try {
    const { page = 1 } = req.query;
    const apiRes = await fetchAPI(`/users?page=${page}`);
    res.status(200).json(apiRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
