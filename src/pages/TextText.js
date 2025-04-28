// src/pages/TextText.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import './TextText.css';

export default function TextText() {
  const [message, setMessage] = useState('');
  const [textFile, setTextFile] = useState(null);
  const [decoded, setDecoded] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEncode = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('message', message);
      formData.append('text', textFile);
      formData.append('password', password);

      const res = await axios.post('https://stegx-backend.onrender.com/text-text/encode', formData, { responseType: 'blob' });

      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'stego_text.txt';
      link.click();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        html: `<b>Text encoded and downloaded.</b>`,
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to encode the text file.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDecode = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('text', textFile);
      formData.append('password', password);

      const res = await axios.post('https://stegx-backend.onrender.com/text-text/decode', formData);
      setDecoded(res.data.message);

      Swal.fire({
        icon: 'success',
        title: 'Decoded!',
        html: `<b>Message:</b><br/>${res.data.message}`,
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to decode the text file.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="text-text-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="glass-card">
        <h2>📄 Hide Text in Text File</h2>

        <input type="file" accept=".txt" onChange={e => setTextFile(e.target.files[0])} className="file-input" />
        <textarea rows="4" placeholder="Enter your hidden message..." value={message} onChange={e => setMessage(e.target.value)} />
        <input type="password" placeholder="Password (optional)" className="file-input" value={password} onChange={e => setPassword(e.target.value)} />

        <div className="btn-group">
          <button onClick={handleEncode}>Encode</button>
          <button onClick={handleDecode}>Decode</button>
        </div>
      </div>
    </motion.div>
  );
}
