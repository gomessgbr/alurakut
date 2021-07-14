import React , {useState, useEffect} from 'react';

import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/alurakutcommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSideBar(propriedades){
  return (
    <>
      <Box as="aside" >            
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
      </Box>
      <hr />
      <a className="" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault/>

    </>
  )

}
function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>  
            <h2 className="smallTitle">
              propriedades.title({propriedades.items.length})
            </h2>          
          <ul>

           {/*{seguidores.map((itemAtual) => {
              return (
                <li key={itemAtual.Id}>
                  <a href={`https://github.com/${itemAtual}.png`}>
                    <img src={itemAtual.image}/>
                    <span>{itemAtual.title}</span>
                  </a>

                  </li>
                  )
                })}*/}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades,setComunidades]=useState([{
    id:'241414214142141341241',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const githubUser = 'gomessgbr';   
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']
  const [seguidores,setSeguidores]=useState([]);

    useEffect(()=>{
      fetch('https://api.github.com/users/gomessgbr/followers')
        .then((respostaDoServidor)=>{
          return respostaDoServidor.json();
      })
      .then((respostaCompleta)=>{
        setSeguidores(respostaCompleta)
      })
    },[])


  return (
    <>
      <AlurakutMenu githubUser='gomessgbr'/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer ? </h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              const dadosDoForm= new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                iamge: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }} >
              <div>
                <input  
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        
        <ProfileRelationsBox title="seguidores" items={seguidores}/>
        
        <ProfileRelationsBoxWrapper>            
          <ul>

            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.Id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image}/>
                    <span>{itemAtual.title}</span>
                  </a>

                  </li>
                  )
                })}
          </ul>
        </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>

              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key= {itemAtual}>
                    <a href={`/users/${itemAtual}`} key = {itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>

                  </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        
      </MainGrid>

    </>
  )
}
