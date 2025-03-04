/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useState, useEffect } from 'react';

/**
 * 钩子函数用于检测当前页面是否在iframe中运行
 * @returns {boolean} 如果在iframe中运行则返回true，否则返回false
 */
export const useInIframe = (): boolean => {
  const [isInIframe, setIsInIframe] = useState<boolean>(false);

  useEffect(() => {
    try {
      // 判断当前window对象是否是顶层窗口
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      // 如果访问window.top时发生安全错误，说明当前页面在跨域iframe中
      // 此时我们可以安全地假设页面在iframe中运行
      setIsInIframe(true);
    }
  }, []);

  return isInIframe;
};

export default useInIframe;
