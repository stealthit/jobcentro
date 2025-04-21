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
        <NMenu
          class='tab-vertical'
          value={this.sideKey}
          options={this.sideMenuOptions}
          defaultExpandedKeys={this.defaultExpandedKeys}
          onUpdateValue={this.handleMenuClick}
        />
      </div>
    )
  }
})

export default Sidebar
