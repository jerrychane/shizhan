import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as LoginActionCreators } from '../../pages/login/store';
import { Link } from 'react-router-dom';
import { 
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addtion,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
} from './style';


class Header extends Component{
    getListArea() {
        const { focused,list,page,totalPage,mouseIn,handleMounseEnter,handleMouseLeave,handleChangePage } = this.props;
        const newList = list.toJS();//将immutable js转换为普通js
        const pageList = [];
        if(newList.length){
            for(let i=(page-1)*10;i<page*10;i++){
                //如果数组不为空，就不push进去
                if(newList[i]){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
              }
            }
        }

        if(focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMounseEnter} onMouseLeave={handleMouseLeave}>
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                        <span ref={(icon)=>{this.spinIcon = icon}} className="iconfont spin">&#xe851;</span>换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                    {/*this.props.list为immutable数组，immutable也提供了map方法 */}
                <SearchInfoList>
                    {pageList}
                </SearchInfoList>
            </SearchInfo>
            )
        }else{
            return null;
        }
    }

    render(){
        const { focused,handleInputFocus,handleInputBlur,list,login,logout } = this.props;
        return (
            <HeaderWrapper>
                    <Link to='/'>
                        <Logo />
                    </Link>
                    <Nav>
                        <NavItem className='left active'>首页</NavItem>
                        <NavItem className='left'>下载App</NavItem>
                        { 
                            login?
                            <NavItem className='right' onClick={logout}>退出</NavItem>: 
                            <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                        }
                        <NavItem className='right'><span className="iconfont">&#xe636;</span></NavItem>
                        <SearchWrapper>
                        <CSSTransition timeout={300} in={this.props.focused} classNames='slide'>
                            <NavSearch className={focused?'focused':''} 
                            onFocus={()=>handleInputFocus(list)} 
                            onBlur={handleInputBlur}></NavSearch>
                        </CSSTransition>
                        <span className={focused?'focused iconfont zoom':'iconfont zoom'}>&#xe64d;</span>
                        {this.getListArea()}
                        </SearchWrapper>
                    </Nav>
                    <Addtion>
                        <Link to='/write'>
                            <Button className='wiriting'><span className="iconfont">&#xe673;</span>写文章</Button>
                        </Link>
                        <Button className='reg'>注册</Button>
                    </Addtion>
                </HeaderWrapper>
        )
    }
}

const mapStateToProps  = (state)=>{
    return {
        //使用redux-immutable将state变为immutable方向
        focused:state.getIn(['header','focused']),
        //state.get('header').get('focused')
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        totalPage:state.getIn(['header','totalPage']),
        mouseIn:state.getIn(['header','mouseIn']),
        login:state.getIn(['login','login'])
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputFocus(list){
          (list.size===0) && dispatch(actionCreators.getList());
           dispatch(actionCreators.searchFocus());
           },

        handleInputBlur(){
           dispatch(actionCreators.searchBlur());
        },
        
        handleMounseEnter(){
           dispatch(actionCreators.mouseEnter()); 
        },

        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        
        handleChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle) {
                originAngle = parseInt(originAngle,10)
            }else{
                originAngle = 0;
            }
            spin.style.transform ='rotate('+(originAngle+360)+'deg)';

            if(page < totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
            //dispatch(actionCreators.changePage());
          },

         logout(){
             dispatch(LoginActionCreators.logout())
         }
    }
        };
        

export default connect(mapStateToProps,mapDispatchToProps)(Header);