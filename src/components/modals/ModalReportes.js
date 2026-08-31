import React from 'react'
import styled from '@emotion/styled'
import RegistrarConductor from 'components/forms/RegistrarConductor'
import { useMediaQuery } from 'react-responsive'


const ModalReports = ({ estado, Component }) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    return (
        <>


            <Overlay>
                <ContenedorModal style={{ width: isTabletOrMobile ? 500 : '' }}>
                    <button style={{ marginBottom: 20, marginLeft: '90%', backgroundColor: '#cc444c', border: 'none', color: 'white', borderRadius: 10 }} type='button' onClick={() => estado(null)}>x</button>
                    <Component estado={estado} />
                </ContenedorModal>
            </Overlay>

        </>
    )
}

export default ModalReports;

const Overlay = styled.div`
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;

`;


const ContenedorModal = styled.div`

    width: 1000px;
    min-height: '50%';
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 39px 0px;
    padding: 20px;

`;