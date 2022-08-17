import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import useInterval from "use-interval";

import Header from "../Header";
import MainContainer from "../Layout/MainContainer";

export default function Timeline() {
    return (
        <MainContainer>
          <Header />
          <Page>
            <Profile>
                <ProfileHeader>
                    <img src="http://s2.glbimg.com/-iAjSgo-VEaDfA3698q1xLzBo0M=/620x453/e.glbimg.com/og/ed/f/original/2016/08/18/baba-cuidando-do-bebe.jpg"></img>
                    <LateralInfo>
                        <h1>Laura Carvalho</h1>
                        <h2>34 years</h2>
                        <h2>15 experience years</h2>
                    </LateralInfo>                    
                </ProfileHeader>
                <Icons>
                    10
                    <ion-icon name="heart-circle-outline"></ion-icon>
                    20
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                </Icons>                
            </Profile>

            <Profile>
                <ProfileHeader>
                    <img src="https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia14634/baba_cpt.JPG"></img>
                    <LateralInfo>
                        <h1>Edivânia Dias</h1>
                        <h2>47 years</h2>
                        <h2>29 experience years</h2>
                    </LateralInfo>
                </ProfileHeader>
                <Icons>
                    15
                    <ion-icon name="heart-circle-outline"></ion-icon>
                    5
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                </Icons> 
            </Profile>            

            <Profile>
                <ProfileHeader>
                    <img src="https://www.lalabee.com.br/f/218124-direito-de-folga-para-baba-entenda-mais-sobre-o-assunto.jpg"></img>
                    <LateralInfo>
                        <h1>Ellen Maria</h1>
                        <h2>19 years</h2>
                        <h2>0 experience years</h2>
                    </LateralInfo>
                </ProfileHeader>
                <Icons>
                    5
                    <ion-icon name="heart-circle-outline"></ion-icon>
                    2
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                </Icons>
            </Profile>

            <Profile>
                <ProfileHeader>
                    <img src="https://soubh.uai.com.br/uploads/post/image/10320/main_bab%C3%A1_foto_Africa_Studio_shutterstock.jpg"></img>
                    <LateralInfo>
                        <h1>Catarina Silva</h1>
                        <h2>28 years</h2>
                        <h2>10 experience years</h2>
                    </LateralInfo>
                </ProfileHeader>
                <Icons>
                    30
                    <ion-icon name="heart-circle-outline"></ion-icon>
                    15
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                </Icons>
            </Profile>
          </Page>
        </MainContainer>
      );
}

const Page = styled.section`
    width: var(--page-width);
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const Title = styled.div`
    padding: var(--tittle-padding);
    h2 {
        font-family: var(--font-family-h2);
        font-weight: var(--font-bold);
        font-size: var(--tittle-font-size);
        color: var(--color-white);
    }
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 250px;
    margin: auto auto 20px;
    background-color: whitesmoke;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(151, 139, 139, 0.25);    
`;

const ProfileHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 580px;
    height: 200px;
    margin: auto;
    margin-left: 40px;
    
    & > img{
        width: 200px;
        height: 150px;
    }

    

`;

const LateralInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    
    & > h1{
        font-family: var(--font-family-h1);
        font-size: var(--tittle-font-size);
        line-height: 50px;
        letter-spacing: 0.05em;
        color: var(--color-black);
    }
    & > h2{
        font-family: var(--font-family-h2);
        font-size: 20px;
        line-height: 50px;
        letter-spacing: 0.05em;
        color: var(--color-black);
    }
`;

const Icons = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 270px;
    margin-bottom: 20px;
    margin-right: 100px;
    & > ion-icon{
        padding-right: 20px;
        padding-left: 8px;
    }
`;

const Content = styled.div`
    display: flex;
`;
    