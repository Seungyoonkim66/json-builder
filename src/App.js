import React from 'react';
import Routes from './common/Routes'
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Header from './common/Header';
import Body from './common/Body';
import Footer from './common/Footer';
import Contents from './common/Contents';
import Welcome from './common/Welcome';
import JsonBuilder from './pages/json-builder';



export default function App() {
  const menus = [
    // root name은 반드시 root로 해야 됨
    { name: "root", link: Routes.root, desc: "welcome page", 
      component: <Welcome 
        title="JSON Builder" 
        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      /> 
    },
  ];

  const jsonBuilder = { name: "json-builder", link: Routes.jsonBuilder, desc: "간단한 설명", component: <JsonBuilder /> };

  return (
    <BrowserRouter>
      {/* subtitle="string", boxShadow={true or false}, bgColor="string" */}
      <Header subtitle="JSON Builder" boxShadow={false} menus={menus} jsonBuilder={jsonBuilder}/>
      <Body direction="row">
        {/* xs={integer} => width:(xs*24)px; **xs=53.3 -> width=1280px (max=67), padding="string"*/}
        <Contents>
          <Switch>
            {menus.map((item, i) => <Route key={i} exact path={item.link} render={() => item.component} />)}
            <Route exact path={jsonBuilder.link} render={() => jsonBuilder.component} />
          </Switch>
        </Contents>
      </Body>
      {/* year={integer} companyName="string" */}
      <Footer year={2021} companyName="seungyoon" />
    </BrowserRouter>
  );
}