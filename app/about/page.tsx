import Image from "next/image";
import thumbs_up from "./images/thumbs_up.jpg";

export default function About() {
    return(
        <main>
            <h1 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '3rem'}}>About the Developers</h1>
            <div style={{display: 'flex', marginTop: '20px'}}>
                <figure style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginRight: '20px'}}>
                    <Image 
                        src={thumbs_up}
                        width={200}
                        height={200}
                        alt="Thumbs Up"
                        style = {{borderRadius: '150px'}}
                    />
                    <figcaption style={{marginTop: '8px'}}>Test Caption</figcaption>
                </figure>
                <p style={{marginTop: '30px', marginLeft: '30px'}}>TEST TEXT</p>
            </div>
            <div style={{display: 'flex'}}>  
                <figure style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginRight: '20px'}}> 
                    <Image 
                        src={thumbs_up}
                        width={200}
                        height={200}
                        alt="Thumbs Up"
                        style = {{borderRadius: '150px'}}
                    />
                    <figcaption style={{marginTop: '8px'}}>Test Caption</figcaption>
                </figure>
                <p style={{marginTop: '30px', marginLeft: '30px'}}>TEST TEXT</p>
            </div>
            <div style={{display: 'flex'}}>  
                <figure style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginRight: '20px'}}> 
                    <Image 
                        src={thumbs_up}
                        width={200}
                        height={200}
                        alt="Thumbs Up"
                        style = {{borderRadius: '150px'}}
                    />
                    <figcaption style={{marginTop: '8px'}}>Test Caption</figcaption>
                </figure>
                <p style={{marginTop: '30px', marginLeft: '30px'}}>TEST TEXT</p>
            </div>
            <div style={{display: 'flex'}}>  
                <figure style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginRight: '20px'}}> 
                    <Image 
                        src={thumbs_up}
                        width={200}
                        height={200}
                        alt="Thumbs Up"
                        style = {{borderRadius: '150px'}}
                    />
                    <figcaption style={{marginTop: '8px'}}>Test Caption</figcaption>
                </figure>
                <p style={{marginTop: '30px', marginLeft: '30px'}}>TEST TEXT</p>
            </div>
            <div style={{display: 'flex'}}>  
                <figure style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginRight: '20px'}}> 
                    <Image 
                        src={thumbs_up}
                        width={200}
                        height={200}
                        alt="Thumbs Up"
                        style = {{borderRadius: '150px'}}
                    />
                    <figcaption style={{marginTop: '8px'}}>Test Caption</figcaption>
                </figure>
                <p style={{marginTop: '30px', marginLeft: '30px'}}>TEST TEXT</p>
            </div>
        </main>
    );
}