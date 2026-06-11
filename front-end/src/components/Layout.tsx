import Header from "./Header"

function Layout({ children }: any) {
    return(
        <div className="min-w-screen min-h-screen bg-[#253342] p-5">
        <Header/>
        {children}
        </div>
    )
}

export default Layout