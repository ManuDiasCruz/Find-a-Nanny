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
            <Title>
              <h2>home</h2>
            </Title>
            <Content>
              <Posts>
                <h1>ANY CONtent</h1>
              </Posts>
            </Content>
          </Page>
        </MainContainer>
      );
}

const Page = styled.section`
    width: var(--page-width);
    margin: auto;
    display: flex;
    flex-direction: column;
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

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    width: var(--post-width);
    margin-right: var(--post-margin);
`;

const Content = styled.div`
    display: flex;
`;
    