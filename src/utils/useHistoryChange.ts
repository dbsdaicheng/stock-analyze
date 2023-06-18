import React from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { useLayoutEffect } from "react";

/**
 * 手动实现history 的监听
 * @returns
 */
 export const useHistoryChange = () => {
  const historyRef = React.useRef<BrowserHistory>(
    createBrowserHistory({ window })
  );

  const history = historyRef.current;

  const [historyState, setHistoryState] = React.useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(
    () =>
      history?.listen((route: any) => {
        // const { pathname } = route;
        // // 回到首页清除缓存
        // if (KEEP_ALIVE_ROUTER.includes(pathname)) {
        //   drop("/selectPlan");
        // }
        // 获取变更history 丢入router
        setHistoryState(route);
      }),
    [history]
  );
  return {
    history,
    historyState,
    setHistoryState,
  };
};