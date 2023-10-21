import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import Card from './Card';
import Footer from './Footer';

function Home(){
  return(
    <div>
        <Navbar/>
        <Jumbotron/>
        
        <Card />
        <Footer/>
    </div>
  );  
}

export default Home;