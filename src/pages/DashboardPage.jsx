import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        navigate('/') // Agar kirilmagan bo'lsa, login sahifasiga haydash
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Chiqishda xatolik:', error.message)
    }
  }

  if (!currentUser) return null // Yuklanish jarayonida bo'sh sahifa ko'rsatib turamiz

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50/40 p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center justify-between min-h-[480px]">
        
        {/* Yuqori qism brend */}
        <div className="text-3xl font-semibold tracking-tighter select-none">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </div>

        {/* Profil Ma'lumotlari */}
        <div className="flex flex-col items-center gap-4 my-auto w-full">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Avatar" 
              className="w-20 h-20 rounded-full border-2 border-emerald-500/20 p-1 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200 font-bold text-2xl">
              {currentUser.displayName ? currentUser.displayName[0] : 'U'}
            </div>
          )}

          <div>
            <h2 className="text-xl font-medium text-slate-800">
              {currentUser.displayName || 'Foydalanuvchi'}
            </h2>
            <p className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full mt-1.5 inline-block">
              {currentUser.email}
            </p>
          </div>

          <p className="text-slate-500 text-xs px-4 leading-relaxed mt-2">
            A Shop platformasiga Google Auth orqali xavfsiz ulandingiz. Barcha funksiyalar faol.
          </p>
        </div>

        {/* Premium Chiqish Tugmasi (Logout) */}
        <button 
          onClick={handleLogout}
          className="w-full h-11 bg-rose-50 border border-rose-200/60 rounded-lg text-rose-600 font-medium text-sm tracking-wide shadow-sm hover:bg-rose-100/70 hover:text-rose-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Tizimdan chiqish
        </button>

      </div>
    </div>
  )
}

export default DashboardPage