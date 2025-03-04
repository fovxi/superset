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

import { useState, useEffect, useRef } from 'react';

/**
 * 检测是否为嵌入模式的参数名
 */
const EMBED_MODE_PARAM = 'embed';

/**
 * 钩子函数用于检测当前页面是否处于嵌入模式
 * 检测方式：
 * 1. URL参数中包含embed=true
 * 2. 尝试检测是否在iframe中
 * 3. 处理非同源iframe导致的安全错误
 *
 * @returns {boolean} 如果处于嵌入模式则返回true，否则返回false
 */
export const useInIframe = (): boolean => {
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);
  const hasChecked = useRef<boolean>(false);

  useEffect(() => {
    if (hasChecked.current) return;

    // 首先检查URL参数是否明确指定嵌入模式
    const urlParams = new URLSearchParams(window.location.search);
    const embedParam = urlParams.get(EMBED_MODE_PARAM);

    if (embedParam === 'true' || embedParam === '1') {
      setIsEmbedded(true);
      hasChecked.current = true;
      return;
    }

    // 然后尝试检测是否在iframe中
    try {
      // 尝试访问顶层window对象，如果会抛出安全错误，说明是跨域iframe
      if (window.self !== window.top) {
        setIsEmbedded(true);
      }
    } catch (e) {
      // 如果访问window.top时发生安全错误，说明当前页面在跨域iframe中
      // 我们认为此时是嵌入模式
      setIsEmbedded(true);
    }

    hasChecked.current = true;
  }, []);

  return isEmbedded;
};

export default useInIframe;
