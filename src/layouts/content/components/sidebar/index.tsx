/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineComponent, ref, PropType } from 'vue'
import { NLayoutSider, NMenu } from 'naive-ui'
import { useMenuClick } from './use-menuClick'
import styles from './index.module.scss'
import Logo from '../logo'

const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    sideMenuOptions: {
      type: Array as PropType<any>,
      default: []
    },
    sideKey: {
      type: String as PropType<string>,
      default: ''
    },
    isShowSide: Boolean
  },
  setup() {
    const collapsedRef = ref(false)
    const defaultExpandedKeys = [
      'workflow',
      'task',
      'udf-manage',
      'service-manage',
      'statistical-manage',
      'task-group-manage'
    ]

    const { handleMenuClick } = useMenuClick()

    
    return { collapsedRef, defaultExpandedKeys, handleMenuClick }
  },
  render() {
    return (
      // <div class={[styles.container, styles.open]}>
      <div class={this.isShowSide ? [ styles.container, styles.open] : styles.container}>
        <div class={styles.top}>
          <Logo isShowSide />
        </div>
        <div class={styles.menuWrap}>
          <ul class={this.isShowSide ? "sbMenuWrap sbOpen" : "sbMenuWrap"}>
            <li class="cur">
              {/* 하위 depth 가 있는 경우 */}
              <details>
                <summary>
                  <div class="depth2Wrap">
                      판매 프로젝트 
                      <img class="ic-setting-18" />
                  </div> 
                </summary>
                <ul>
                  <li>
                    <div class="title cur">Group1</div>
                    <ul>
                      <li>입점사 데이터 수집</li>
                      <li>PG사 데이터 수집</li>
                    </ul>
                  </li>
                  <li>
                    <div class="title">Group2</div>
                    <ul>
                      <li>포탈 판매금액 수집</li>
                    </ul>
                  </li>
                </ul>
              </details>
              {/* ------------------------ */}
            </li>
            <li>
              <details>
                <summary>
                  <div class="depth2Wrap">
                      청구 프로젝트
                      <img class="ic-setting-18" />
                  </div> 
                </summary>
                <ul>
                  <li>
                    <div class="title">Group3</div>
                    <ul>
                      <li>청구서 발송</li>
                      <li>우편 발송</li>
                      <li>이메일 발송</li>
                    </ul>
                  </li>
                  <li>
                    <div class="title">Group4</div>
                    <ul>
                      <li>청구서 발송</li>
                      <li>우편 발송</li>
                      <li>이메일 발송</li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  <div class="depth2Wrap">
                      인사 프로젝트
                      <img class="ic-setting-18" />
                  </div> 
                </summary>
                <ul>
                  <li>
                    <div class="title">Group3</div>
                    <ul>
                      <li>청구서 발송</li>
                      <li>우편 발송</li>
                      <li>이메일 발송</li>
                    </ul>
                  </li>
                  <li>
                    <div class="title">Group4</div>
                    <ul>
                      <li>청구서 발송</li>
                      <li>우편 발송</li>
                      <li>이메일 발송</li>
                    </ul>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    )
  }
})

export default Sidebar
