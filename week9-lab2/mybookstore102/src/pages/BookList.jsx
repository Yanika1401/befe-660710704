// BookList.jsx
import { BookOpenIcon, LogoutIcon, PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/v1/books');
      if (!response.ok) throw new Error('ไม่สามารถดึงข้อมูลได้');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.includes(searchTerm))
    );
    setFilteredBooks(filtered);
  };

  const handleEdit = (bookId) => {
    navigate(`/store-manager/edit-book/${bookId}`);
  };

  const handleDelete = async (book) => {
    if (window.confirm(`คุณต้องการลบหนังสือ "${book.title}" ใช่หรือไม่?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${book.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('ไม่สามารถลบหนังสือได้');
        setBooks(books.filter(b => b.id !== book.id));
        setFilteredBooks(filteredBooks.filter(b => b.id !== book.id));
        alert('ลบหนังสือเรียบร้อยแล้ว!');
      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
      }
    }
  };

  const handleAddBook = () => {
    navigate('/store-manager/add-book');
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">❌ เกิดข้อผิดพลาด: {error}</p>
          <button 
            onClick={fetchBooks}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-7 w-7" />
            <h1 className="text-xl font-semibold tracking-wide">BookStore - BackOffice</h1>
          </div>
          {/* ✅ ปุ่มออกจากระบบ */}
          <button
            onClick={LogoutIcon}
            className="flex items-center bg-white text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
          >
            <LogoutIcon className="h-5 w-5 mr-1" />
            ออกจากระบบ
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">จัดการหนังสือทั้งหมด</h2>
          <button
            onClick={handleAddBook}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" /> เพิ่มหนังสือ
          </button>
        </div>

        {/* Search & Count */}
          <div className="mb-4">
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="text-gray-600">
              จำนวนหนังสือทั้งหมด: <span className="text-viridian-600 font-bold text-xl">{filteredBooks.length}</span> เล่ม
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">ชื่อหนังสือ</th>
                <th className="px-4 py-3">ผู้แต่ง</th>
                <th className="px-4 py-3">ISBN</th>
                <th className="px-4 py-3">ปีที่พิมพ์</th>
                <th className="px-4 py-3">ราคา (฿)</th>
                <th className="px-4 py-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    ไม่พบข้อมูลหนังสือ
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, index) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{book.title}</td>
                    <td className="px-4 py-3 text-gray-700">{book.author}</td>
                    <td className="px-4 py-3 text-gray-700">{book.isbn}</td>
                    <td className="px-4 py-3 text-gray-700">{book.year}</td>
                    <td className="px-4 py-3 text-black-600 font-semibold">
                      ฿{Number(book.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(book.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(book)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BookList;