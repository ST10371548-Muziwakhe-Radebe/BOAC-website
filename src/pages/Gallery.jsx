import {useEffect,useState} from 'react'
import {A,PageHero,SectionTitle} from '../components.jsx'

const photos=[
  {src:'programme-youth.png',title:'Generations Growing Together',caption:'Young people and elders connect through BOAC community programmes.',wide:true},
  {src:'hero-elder.png',title:'Wisdom at the Heart of BOAC',caption:'Honouring the stories, dignity and contribution of every elder.'},
  {src:'programme-skills.png',title:'Care and Wellness',caption:'Practical support that keeps community members active and connected.'},
  {src:'programme-learning.png',title:'Learning for Life',caption:'Accessible literacy and learning opportunities across generations.',wide:true},
  {src:'about-hero.png',title:'Our Bokwidi Community',caption:'The people and relationships behind the centre’s daily work.'},
  {src:'donate-hero.png',title:'Support That Reaches Home',caption:'Community generosity helps BOAC provide care where it matters most.'},
]

export function Gallery(){
  const[selected,setSelected]=useState(null)
  useEffect(()=>{if(selected===null)return;const close=e=>{if(e.key==='Escape')setSelected(null)};addEventListener('keydown',close);document.body.classList.add('modal-open');return()=>{removeEventListener('keydown',close);document.body.classList.remove('modal-open')}},[selected])
  const move=step=>setSelected(current=>(current+step+photos.length)%photos.length)
  return <><PageHero image="programme-youth.png" eyebrow="Our Community in Pictures" title="Gallery" text="A glimpse into the care, connection, learning and celebration that bring BOAC to life."/><section className="section soft-bg"><div className="container"><SectionTitle eyebrow="BOAC Moments" title="Stories of dignity and connection" text="Select an image to view it in detail."/><div className="gallery-grid">{photos.map((photo,index)=><button className={`gallery-card ${photo.wide?'gallery-card-wide':''}`} key={photo.title} onClick={()=>setSelected(index)} aria-label={`Open image: ${photo.title}`}><img src={`${A}${photo.src}`} alt={photo.caption}/><span className="gallery-overlay"><strong>{photo.title}</strong><small>{photo.caption}</small></span></button>)}</div></div></section>{selected!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={photos[selected].title} onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><button className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close gallery viewer">×</button><button className="lightbox-nav lightbox-prev" onClick={()=>move(-1)} aria-label="Previous image">‹</button><figure><img src={`${A}${photos[selected].src}`} alt={photos[selected].caption}/><figcaption><strong>{photos[selected].title}</strong><span>{photos[selected].caption}</span><small>{selected+1} of {photos.length}</small></figcaption></figure><button className="lightbox-nav lightbox-next" onClick={()=>move(1)} aria-label="Next image">›</button></div>}</>
}
