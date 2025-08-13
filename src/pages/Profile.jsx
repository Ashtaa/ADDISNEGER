import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.profileImage || '');
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result); // base64
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`http://localhost:5000/profile/${user._id}`, {
        name,
        profileImage: image || user.profileImage,
      });
      updateUser(res.data);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Your Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={image || '/default-user.jpeg'}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-400 shadow-md"
        />
      </div>

      {/* Upload Image */}
      <div className="mb-4 text-center">
        <label className="block text-gray-600 mb-1 font-medium">Change Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
            file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1 font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-1 font-medium">Email</label>
        <input
          value={user?.email}
          disabled
          className="w-full px-4 py-2 border bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}

export default Profile;
