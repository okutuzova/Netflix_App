
import bgimg from '../assets/banner-bg.jpg'

const Nav = () =>  {
    return (
        <>
            <div className="px-30 py-5 bg-black bg-cover text-white z-10">

                <div className='absolute inset-0 bg-cover bg-center opacity-30' style={{backgroundImage: `url(${bgimg})`}}></div>

                <div className='relative z-0'>
                    <div className="flex justify-between items-center ">
                    <div className="text-4xl font-bold text-red-600">NETFLIX   
                    </div>
                
                    <div className="flex">
                        <div>
                            <select className="pr-25 border p-1 mr-2 border-gray-500" name="" id="">
                            <option className="text-black" value="en">English</option>
                            <option className="text-black" value="es">Spanish</option>
                            </select>
                        
                        </div>
                        <button className="bg-red-600 px-5 py-1 rounded">Registrati</button>
                    </div>
                </div>

                <div className="py-40 flex flex-col items-center">
                    
                    <div className="text-6xl font-bold w-150 text-center">Film, serie e altro ancora illimitati</div>

                    <div className="py-5 font-bold text-[18px]">A partire da 99 EUR. Annulla in qualsiasi momento.</div>
                    
                    <p>Pronto a guardare? Inserisci la tua email per creare o riavviare la tua iscrizione.</p>
                    
                    <div className="py-5">
                        <input className="border p-2 border-gray-500 pr-30 mr-5" type="text" placeholder="Indirizzo email" />
                        <button className="bg-red-600 p-2 px-5 rounded">Inizia</button>
                    </div>
                </div>
                </div>
              
            </div>
        </>
    )
}

export default Nav