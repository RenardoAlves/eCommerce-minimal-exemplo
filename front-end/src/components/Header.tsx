import { Link } from 'react-router-dom'

function Header() {
    return(
        <div className="py-3 rounded-md bg-[#8AC58A] flex flex-row items-center">
            <div className="px-30"><Link to='/'>Home</Link></div>
            <div className="ml-auto flex flex row gap-30 mr-30">
                <div><Link to='login'>Login</Link></div>
                <div><Link to='register'>Registro</Link></div>
            </div>
            <div>
                <Link to='/cart'><img className="max-h-10 mr-10" src="/carrinho.webp"/></Link>
            </div>
        </div>
    )
}

export default Header