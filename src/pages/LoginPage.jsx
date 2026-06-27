import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/dashboard', { state: { email: currentUser.email } })
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Xatolik:', error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/40 p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
        
        {/* Brending va Logotip */}
        <div className="text-center mt-2">
          <div className="text-3xl font-semibold tracking-tighter mb-4 select-none">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          <h1 className="text-2xl font-medium text-slate-800 tracking-tight">Tizimga kirish</h1>
          <p className="text-slate-500 text-sm mt-2 font-normal">A Shop platformasida davom etish</p>
        </div>

        {/* Markaziy qism (Vizual interfeys) */}
        <div className="flex flex-col items-center gap-6 my-auto w-full">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200/60 shadow-inner">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hisobni tanlang</span>
          </div>

          {/* Premium Google Tugmasi */}
          <button 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="w-full h-12 border border-slate-200 rounded-lg bg-white flex items-center justify-center gap-3 font-medium text-slate-600 transition-all duration-200 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <img 
              src="https://www.svgrepo.com/show/475656/google-color.svg" 
              alt="Google" 
              className="w-5 h-5"
            />
            <span className="text-sm tracking-wide">
              {isLoading ? 'Yuklanmoqda...' : 'Google hisobi orqali kirish'}
            </span>
          </button>
        </div>

        {/* Pastki qism */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed border-t border-slate-100 pt-5">
          Xavfsiz autentifikatsiya. Davom etish orqali siz Google bildirishnomalariga hamda A Shop maxfiylik shartlariga rozilik bildirasiz.
        </p>
      </div>
    </div>
  )
}

export default LoginPage