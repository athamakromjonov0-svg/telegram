import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [currentLang, setCurrentLang] = useState('O‘zbekcha')

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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-tr from-[#eef2f7] via-[#e4e9f2] to-[#d9e2ec] p-4 font-sans selection:bg-[#24A1DE]/20">
      
      {/* Yuqori bo'sh joy muvozanat uchun */}
      <div className="hidden md:block h-10"></div>

      {/* Asosiy Telegram Login Konteyneri */}
      <div className="w-full max-w-[430px] bg-white border border-slate-200/60 rounded-[28px] shadow-[0_12px_40px_rgba(36,161,222,0.06)] p-8 md:p-10 flex flex-col justify-between min-h-[560px] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(36,161,222,0.12)] bg-opacity-95 backdrop-blur-md relative overflow-hidden my-auto">
        
        {/* Dekorativ fon elementlari (Premium dizayn uchun light-effect) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#24A1DE]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#2abee3]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 1. Brending va Logotip Bloki */}
        <div className="text-center mt-2 flex flex-col items-center z-10">
          {/* Telegram Animatsiyali Samolyotcha Foni */}
          <div className="w-22 h-22 bg-gradient-to-b from-[#2abee3] to-[#229ed9] rounded-[24px] flex items-center justify-center shadow-lg shadow-[#24a1de]/30 mb-6 transform hover:rotate-6 transition-transform duration-300 cursor-pointer">
            <svg 
              className="w-11 h-11 text-white translate-x-[-3px] translate-y-[2px]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Telegram</h1>
          <p className="text-slate-500 text-sm mt-2 font-normal leading-relaxed max-w-[280px]">
            K2 yangi avlod ekotizimi hamda A Telegram Web platformasiga xavfsiz kirish.
          </p>
        </div>

        {/* 2. Markaziy Harakatlar Bloki */}
        <div className="flex flex-col items-center w-full my-8 z-10">
          
          {/* Avtorizatsiya holati haqida info kartochka */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4.5 mb-6 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#24A1DE] flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10m3-3H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-3m0 1a3 3 0 100-6M3 19a9 9 0 0118 0" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-700">Xavfsiz ulanish</span>
              <span className="text-[11.5px] text-slate-400 mt-0.5 leading-normal">Ushbu autentifikatsiya turi shaxsingizni va maxfiy ma'lumotlaringizni to'liq himoya qiladi.</span>
            </div>
          </div>

          {/* Premium Telegram Katta Google Tugmasi */}
          <button 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-[#24A1DE] text-white flex items-center justify-center gap-4 font-semibold transition-all duration-200 shadow-md shadow-[#24a1de]/25 hover:bg-[#1e92cb] hover:shadow-lg hover:shadow-[#24a1de]/35 active:scale-[0.985] focus:outline-none focus:ring-4 focus:ring-[#24a1de]/20 disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {/* KATTALASHTIRILGAN oq rangli ichki Google konteyneri */}
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md shadow-black/5 transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="w-5 h-5" /* Ikonka 5px ga kattalashtirildi va mukammal joylashdi */
              />
            </div>
            <span className="text-sm md:text-base tracking-wide font-medium">
              {isLoading ? 'Ulanish o‘rnatilmoqda...' : 'Google hisobi bilan faollashtirish'}
            </span>
          </button>

          {/* Aktiv holat indikatori */}
          <div className="flex items-center gap-2 mt-5 text-[12px] text-[#24A1DE] font-semibold bg-[#24A1DE]/8 px-4 py-2 rounded-xl border border-[#24A1DE]/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24A1DE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#24A1DE]"></span>
            </span>
            Tezkor avtorizatsiya serveri faol
          </div>

        </div>

        {/* 3. Pastki Texnik Ma'lumotlar va Qo'llab-quvvatlash */}
        <div className="text-center border-t border-slate-100 pt-6 z-10">
          <p className="text-[11px] text-slate-400 leading-relaxed px-1">
            Tizim MTProto va Telegram Passport shifrlash protokollari asosida ishlaydi. Google orqali kirganingizda maxfiylik shartlariga va xizmat ko'rsatish qoidalariga avtomatik rozilik bildirasiz.
          </p>
          
          {/* Versiya va mualliflik huquqi */}
          <div className="text-[10px] text-slate-300 font-mono tracking-widest mt-4 uppercase">
            v2.4.0-K2 // Secure Build
          </div>
        </div>

      </div>

      {/* 4. Loyihaning Pastki Tashqi Footer Qismi (Til tanlash va yordam) */}
      <div className="w-full max-w-[430px] flex items-center justify-between px-4 mt-4 text-xs text-slate-500 z-10">
        
        {/* Til tanlash menyusi simulyatsiyasi */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#24A1DE] transition-colors duration-150 group">
          <span>{currentLang}</span>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          
          {/* Yashirin tillar ro'yxati (SEO va UI boyitish uchun) */}
          <span className="sr-only">English, Русский, O'zbekcha</span>
        </div>

        {/* Yordam markazi havolalari */}
        <div className="flex items-center gap-4">
          <a href="#help" className="hover:text-[#24A1DE] hover:underline transition-all duration-150">Yordam</a>
          <a href="#privacy" className="hover:text-[#24A1DE] hover:underline transition-all duration-150">Maxfiylik</a>
          <a href="#terms" className="hover:text-[#24A1DE] hover:underline transition-all duration-150">Shartlar</a>
        </div>
        
      </div>

      {/* Qo'shimcha CSS effektlar va animatsiyalar uchun inline klasslar (Ssenariyni to'ldirish uchun) */}
      <div className="hidden">
        <span className="animate-spin duration-1000"></span>
        <span className="backdrop-blur-xl bg-opacity-90 border-emerald-500"></span>
        <span className="text-slate-600 font-light tracking-wide text-lg"></span>
      </div>

    </div>
  )
}

export default LoginPage