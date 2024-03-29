import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const HeaderWrapper = styled.div`
    z-index:1;
    position:relative;
    height:58px;
    border-bottom:1px solid #f0f0f0;
`;

export const Logo = styled.div`
    position:absolute;
    top:0;
    left:0;
    display:block;
    height:58px;
    width:100px;
    border-bottom:1px solid #f0f0f0;
    background:url(${logoPic});
    background-size:contain;
`;

export const Nav = styled.div`
    width:960px;
    height:100%;
    padding-right:70px;
    box-sizing:border-box;
    margin:0 auto;
`;

export const NavItem = styled.div`
   line-height:58px;
   padding:0 15px;
   font-size:17px;
   color:#333;
   &.left {
       float:left;
   }
   &.right {
       float:right;
       color:#969696;
   }
   &.active{
       color:#ea6f5a;
   }
`;

export const SearchWrapper = styled.div`
   position:relative;
   float:left;
   .zoom{
       position:absolute;
       right:5px;
       bottom:5px;
       width:30px;
       height:30px;
       border-radius:15px;
       line-height:30px;
       text-align:center;
       &.focused{
           background:#777;
           color:#fff;
       }
   }
`;

export const NavSearch = styled.input.attrs({
    placeholder:'搜索'
})`
    width:240px;
    height:38px;
    padding:0 30px 0 20px;
    margin-top:10px;
    margin-left:20px;
    box-sizing:border-box;
    border:none;
    outline:none;
    border-radius:19px;
    background:#eee;
    font-size:14px;
    color:#666;
    &::placeholder{
        color:#999;
    }
    &.focused {
        width:320px;
    }
    &.slide-enter{
        transition:all .3s ease-out;
   }
   &.slide-enter-active{
        width:320px;

   }
   &.slide-exit{
        transition:all .3s ease-out;
   }
   &.slide-exit-active{
        width:240px;
   }
`;

export const SearchInfo = styled.div`
    position:absolute;
    left:20px;
    top:56px;
    width:250px;
    box-sizing:border-box;
    padding:0 20px;
    background:#fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
`;

export const SearchInfoTitle = styled.div`
    margin-top:20px;
    margin-bottom:15px;
    line-height:20px;
    font-size:14px;
    color:#969696;
`;

export const SearchInfoSwitch = styled.span`
    float:right;
    font-size:13px;
    cursor:pointer;
    .spin{
        display:block;
        float:left;
        font-size:12px;
        margin-right:5px;
        transition:all .3s ease-in;
        transform-origin:center center;
    }
`;

export const SearchInfoList = styled.div`
    overflow:hidden;
`;

export const SearchInfoItem = styled.a`
   float:left;
   display:block;
   line-height:20px;
   padding:0 5px;
   font-size:12px;
   border:1px solid #ddd;
   color:#787878;
   border-radius:3px;
   margin-right:10px;
   margin-bottom:10px;
`;

export const Addtion = styled.div`
    position:absolute;
    right:0;
    top:0;
    height:58px;
`;

export const Button = styled.div`
    float:right;
    margin-top:10px;
    margin-right:20px;
    padding:0 20px;
    border:1px solid #ec6149;
    line-height:38px;
    border-radius:19px;
    font-size:14px;
    &.reg{
        color:#ec6149;
    }
    &.wiriting{
        color:#fff;
        background:#ec6149;
    }
`;

