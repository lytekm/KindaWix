import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://localhost:5000/api/maker/create', req.body);
      res.status(201).json(response.data);
    } catch (error) {
      console.error('Error creating page:', error);
      res.status(500).json({ message: 'Failed to create page' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}