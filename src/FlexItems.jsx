import './FlexItems.css' 

const FlexItems =()=>{
    return(
<>
<h1>Flex Container</h1>
<p>Four Flex Items contained in a Flex Container</p>
    <header style={{backgroundColor:"orangered",display:'flex'}}>
    <div style={{paddingLeft:'100px', paddingRight:'100px', display:'flex', justifyContent:'space-between', color: 'white'}}>
        <div>Seller Center | Mulai Berjualan </div>
        <div>Daftar Login</div>
    </div>
</header>
</>

    );
}
export default FlexItems
