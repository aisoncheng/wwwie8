

// 传递一个 span  offset 返回 width 和marginLeft
function  position(position){
   if(!position){
     return {};
   }
   const style = {};
   // 有宽度的 /24 阑珊
   if(position.span){
     style.width = position.span/24*100+'%';
   }
   // 有margin的
   if(position.offset){
     style['marginLeft'] = (position.offset/24*100)+'%';
   }
   return style;

}
export default {
    position
}