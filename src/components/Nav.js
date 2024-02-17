import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'
import { useSelector } from 'react-redux'

const Nav = () => {
    const initialUserData = localStorage.getItem('userData') ? 
    JSON.parse(localStorage.getItem('userData')) : {}
    const [show, setShow] = useState(false)
    const { pathname, search } = useLocation()
    const [searchValue, setSearchValue] = useState("")
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [userData, setUserData] = useState(initialUserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state)=>state.user.userInfo)

    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (pathname === '/') {
                    navigate('/main')
                }
            }
            else {
                navigate('/')
            }
        })

    }, [auth,navigate,pathname]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    //추가
    useEffect(() => {
        // 페이지 이동 시 searchValue 초기화
        setSearchValue("")
    }, [pathname])

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${searchValue}`);
        }
    }

    const handleAuth = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch(setUser({
                    id:result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }))
            })
            .catch(err => console.error(err));
    }
    const handleSighOut = () => {
        signOut(auth).then(() => {
            setUserData({})
            navigate('/')
        })
            .catch(err => console.error(err));
    }

    // 추가한 부분
    useEffect(() => {
        const params = new URLSearchParams(search);
        const q = params.get('q');
        if (q !== null) {
            setSearchValue(q);
        }
    }, [search])

    const handleInputFocus = () => {
        setIsInputFocused(true);
    }

    const handleInputBlur = () => {
        setIsInputFocused(false);
    }

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    alt='Disney Logo'
                    src="/images/logo.svg"
                    onClick={() => {
                        window.location.href = "/"
                    }}
                />
            </Logo>
            {pathname === "/" ?
                (<Login onClick={handleAuth}>Login</Login>) :
                <>
                    <Input
                        className={`nav__input ${isInputFocused ? 'focused' : ''}`}
                        type='text'
                        placeholder='검색해주세요'
                        value={searchValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />

                    <SignOut>
                        <UserImg src={userData.photoURL} alt={userData.displayName}/>
                            <DropDown>
                                <span onClick={handleSighOut}>Sign Out</span>
                            </DropDown>
                    </SignOut>


                </>}


        </NavWrapper>
    )
}

export default Nav
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.nav`
position: fixed;
top:0;
left:0;
right:0;
height:70px;
background-color:${props => props.show ? '#090b13;' : "transparent"};
display:flex;
justify-content:space-between;
align-items:center;
padding:0 36px;
letter-spacing:16px;
z-index:3;
`
const Logo = styled.a`
padding:0;
width:80px;
margin-top:4px;
max-height:70px;
font-size:0;
display:inline-block;

img{
    display:block;
    width:100%;
}
`

const Login = styled.a`
background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 5px;
    color: white; 
    padding: 10px; 
    border: none;
    width: 100px;
    transition: 0.6s; 

    &:focus {
        width: 300px; 
        outline: none;
    }

    &::placeholder {
        color: #b3b3b3;
    }
`;