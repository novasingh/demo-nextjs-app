import { fetchAPI } from "@/utils/api"

export default async function handler(req,res) {
    if (req.method === 'POST') {
        const data = req.body;
        try {
          const apiRes = await fetchAPI(JSON.parse(data).url, {
            method: 'POST',
            body:JSON.stringify(JSON.parse(data).data),
          });
          res.status(200).json(apiRes);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
}