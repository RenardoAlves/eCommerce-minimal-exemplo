function GridProdutos({ children }: any) {
    return(
        <div className="grid grid-cols-5 gap-10 m-10">
            {children}
        </div>
    )
}

export default GridProdutos