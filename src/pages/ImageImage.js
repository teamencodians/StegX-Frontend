// src/pages/ImageImage.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import './ImageImage.css';

export default function ImageImage() {
  const [cover, setCover] = useState(null);
  const [secret, setSecret] = useState(null);
  const [stego, setStego] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEncode = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('cover', cover);
      formData.append('secret', secret);
      formData.append('password', password);

      const res = await axios.post('http://stegx-backend.onrender.com/encode/imageinimage', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'image_stego.png';
      link.click();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        html: `<b>Stego image encoded and downloaded.</b>`,
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Encoding failed. Please check your images.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDecode = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('stego', stego);
      formData.append('password', password);

      const res = await axios.post('http://stegx-backend.onrender.com/decode/imageinimage', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'hidden_image.png';
      link.click();

      Swal.fire({
        icon: 'success',
        title: 'Decoded!',
        html: `<b>Hidden image extracted and downloaded.</b>`,
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Decoding failed. Please check the image or password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="image-image-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="glass-card">
        <h2>🖼️ Hide Image in Another Image</h2>

        <label>Cover Image</label>
        <input type="file" accept="image/*" onChange={e => setCover(e.target.files[0])} className="file-input" />

        <label>Secret Image</label>
        <input type="file" accept="image/*" onChange={e => setSecret(e.target.files[0])} className="file-input" />

        <input type="password" placeholder="Password (optional)" className="file-input" value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={handleEncode}>🔐 Encode Image</button>

        <hr style={{ margin: '30px 0' }} />

        <label>Stego Image (to decode)</label>
        <input type="file" accept="image/*" onChange={e => setStego(e.target.files[0])} className="file-input" />

        <input type="password" placeholder="Password (optional)" className="file-input" value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={handleDecode}>🔎 Decode Image</button>
      </div>
    </motion.div>
  );
}
