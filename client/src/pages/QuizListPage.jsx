// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { Link } from "react-router-dom";
// import Loader from "../components/Loader";

// const QuizListPage = () => {
//   const { backendUrl } = useContext(AppContext);
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(backendUrl + "/api/quiz/list", { withCredentials: true });
//         data.success ? setQuizzes(data.quizzes) : toast.error(data.message);
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuizzes();
//   }, [backendUrl]);

//   return (
//     <div>
//       <Navbar />
//       <div className="w-full min-h-[calc(100vh-80px)] max-w-5xl mx-auto p-6">
//         <h1 className="font-monts font-bold text-4xl text-white px-8 py-4 rounded-full bg-[#2A4674] mt-10">Quizzes</h1>
//         {loading ? (
//           <Loader label="Loading quizzes..." />
//         ) : quizzes.length === 0 ? (
//           <div className="mt-10 text-center text-gray-600">No quizzes available yet. Create one from Generate Quiz or check back later.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//             {quizzes.map((q) => (
//               <div key={q._id} className="border-2 border-[#2A4674] rounded-2xl p-5">
//                 <h3 className="font-bold text-xl">{q.name}</h3>
//                 <p className="text-gray-600">{q.subject}</p>
//                 <div className="mt-4">
//                   <Link to={`/quiz/${q._id}`} className="px-4 py-2 bg-[#2A4674] text-white rounded-full">Start</Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizListPage;
import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const QuizListPage = () => {
  const { backendUrl } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(backendUrl + "/api/quiz/list", {
          withCredentials: true,
        });
        data.success ? setQuizzes(data.quizzes) : toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120026] to-[#1a0037] relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background decorative elements */}
{/* Background decorative elements */}
     <div className="absolute top-28 left-12 w-12 h-12">
       <img src="../assets/moon.png" alt="moon" className="w-full h-full object-contain" />
     </div>

    <div className="absolute top-40 right-16 w-16 h-16">
     <img src="../assets/rocket.png" alt="rocket" className="w-full h-full object-contain" />
    </div>

    <div className="absolute bottom-20 left-1/4 w-6 h-6">
     <img src="../assets/star.png" alt="star" className="w-full h-full object-contain" />
    </div>

    <div className="absolute top-1/2 right-1/3 w-6 h-6">
     <img src="../assets/star.png" alt="star" className="w-full h-full object-contain" />
    </div>


      {/* Quiz Container */}
      <div className="relative max-w-4xl mx-auto mt-16 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-6">
            <span className="text-[#2A4674]">QUIZ</span>{" "}
            <span className="text-yellow-500">TIME</span>
          </h1>

          {/* Content */}
          {loading ? (
            <Loader label="Loading quizzes..." />
          ) : quizzes.length === 0 ? (
            <div className="mt-10 text-gray-600">
              No quizzes available yet. Create one from Generate Quiz or check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {quizzes.map((q) => (
                <div
                  key={q._id}
                  className="border-2 border-[#2A4674] rounded-2xl p-5 bg-gray-50 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-xl">{q.name}</h3>
                  <p className="text-gray-600">{q.subject}</p>
                  <div className="mt-4">
                    <Link
                      to={`/quiz/${q._id}`}
                      className="px-4 py-2 bg-[#2A4674] text-white rounded-full hover:bg-[#1d3152] transition"
                    >
                      Start 🚀
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizListPage;