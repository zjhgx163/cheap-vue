<template>
  <q-page class="bg-secondary">
    <!-- <q-dialog auto-close v-model="mobileBroswer">
      <q-card class="bg-blue text-white">
        <q-card-section class="row items-center q-pb-none q-pt-xs">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
          &#9996;&#9996;实现看片自由。移动端请关注微信公众号“老胡为你服务”，在公众号内访问。PC端请在浏览器上访问“www.hjdang.com”
        </q-card-section>
      </q-card>
    </q-dialog> -->
    <!-- <q-dialog v-model="isInvalid">
      <q-card class="bg-blue text-white">
        <q-card-section>
          此资源已失效，不过有朋友分享了同样的资源，请在站内用关键词搜索。&#9996;&#9996;实现看片自由，请关注微信公众号“老胡为你服务“，或在浏览器上访问
          “www.hjdang.com”
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="关闭" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <div class="row">
      <!-- 详情页 -->
      <div class="col row bg-primary">
        <div class="col column">
          <div class="col q-pa-sm bg-secondary">
            <q-item dense class="q-pb-lg">
              <q-item-label class="flex-center row">
                <q-breadcrumbs class="text-dark">
                  <template v-slot:separator>
                    <q-icon size="1.1em" name="chevron_right" color="dark" />
                  </template>
                  <q-breadcrumbs-el icon="home" to="/" class="text-dark text-caption" />
                  <q-breadcrumbs-el
                    :label="breadcrumb"
                    class="text-dark text-caption"
                    :to="categoryTo"
                  />
                  <q-breadcrumbs-el label="正文" class="text-dark text-caption" />
                </q-breadcrumbs>
              </q-item-label>
            </q-item>

            <!-- <q-item dense class="YL__return q-pt-none q-mt-xs">
              <q-item-label class="flex-center row">
                <q-icon name="keyboard_return" color="pink-4" />
                <span> &nbsp;&nbsp;</span>
                <router-link
                  class="text-pink-4"
                  style="text-decoration: underline"
                  :to="{
                    path: '/',
                  }"
                >
                  返回资源列表
                </router-link>
              </q-item-label>
            </q-item> -->
            <!-- <div class="q-pa-md">
              <q-card dark bordered class="flex-center text-white bg-grey-9">
                <q-card-section>
                  <q-item dense class="q-pt-none">
                    <q-item-section>
                      <q-item-label class="column flex-center">
                        <span class="text-caption text-bold"
                          >精打细算，做聪明网购人。下单前先查优惠券，还有大额返利，比自己去平台买省下一个亿！：
                          <a
                            href="https://mp.weixin.qq.com/s?__biz=MzkzMzIyMzU0MA==&mid=2247483916&idx=1&sn=2e36901033e066c96d44990b4b338e2f&chksm=c24e8f17f5390601ee49beb7e6f6eeba01ecfbe136e632bcc62bb40132d7ca8d595c8e91c56d&token=1769763799&lang=zh_CN#rd"
                            style="text-decoration: underline"
                            class="text-yellow text-subtitle2 text-bold"
                          >
                            领券返利 </a
                          >,
                          <a
                            href="https://shop.hjdang.com"
                            style="text-decoration: underline"
                            class="text-yellow text-subtitle2 text-bold"
                          >
                            手慢无 </a
                          >里都是挑选过的当天最优惠商品，折扣转瞬即逝，性价比全网最高，京东同样有返利。<br />
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </div> -->
            <div
              v-if="$q.platform.is.mobile"
              class="adsenseunitdetail q-pa-xs mobile_adsense_dimension"
            >
              <!-- in-article-aquare2 -->
              <ins
                class="adsbygoogle mobile_adsense_dimension"
                style="display: block"
                data-ad-client="ca-pub-3935005489954231"
                data-ad-slot="6650477400"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            <q-item dense>
              <!-- <q-item-label class="column flex-center"> </q-item-label> -->
              <q-item-section>
                <q-item-label :lines="2">
                  <header>
                    <h1
                      class="text-h6 text-bold q-mt-none q-mb-sm"
                      v-bind:class="{ 'text-grey': isInvalid }"
                    >
                      <!-- , YL__invalid_item: isInvalid -->
                      {{ item.title }}
                      <!-- <q-icon :name="getTagIcon(item.tag)" :color="getTagColor(item.tag)" /> -->

                      <q-badge
                        transparent
                        align="middle"
                        :color="getTagColor(item.tag)"
                        :label="item.tag"
                      >
                      </q-badge>
                    </h1>
                  </header>
                </q-item-label>
                <q-item-label
                  :lines="2"
                  class="text-black text-bold"
                  v-bind:class="{ hidden: !isInvalid, 'text-body2': $q.platform.is.mobile }"
                >
                  链接已失效，<span v-bind:class="[noticefont]" class="text-red-13 text-bold"
                    >站内有相同资源</span
                  >，请在搜索框内<span v-bind:class="[noticefont]" class="text-red-13 text-bold"
                    >搜索</span
                  >或关注微信公众号<span v-bind:class="[noticefont]" class="text-red-13 text-bold"
                    >老胡为你服务</span
                  >
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="items-center">
              <q-item-section avatar style="min-width: 30px">
                <q-avatar :size="avatarSize" v-if="item.avatar != '' && item.avatar != null">
                  <img
                    :src="item.avatar"
                    :alt="item.auther"
                    :width="avatarSize"
                    :height="avatarSize"
                  />
                </q-avatar>
                <q-avatar
                  :size="avatarSize"
                  :style="getAvatarColor(item.auther)"
                  text-color="white"
                  v-else
                >
                  {{ getAvatarText(item.auther) }}</q-avatar
                >
              </q-item-section>
              <q-item-section class="YL__auther text-bold text-black">
                {{ item.auther }}
              </q-item-section>
              <q-item-section class="YL__auther">
                {{ item.createDateStr }}
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-item-label>
                  <article
                    class="text-body2 Post-body break-all q-mt-sm"
                    v-bind:class="{ 'text-grey': isInvalid }"
                  >
                    <div v-html="item.content"></div>
                    <!-- <div
                      class="q-mt-md"
                      v-if="item.resourceTree != null && item.resourceTree != ''"
                    >
                      <q-separator />
                      <h2 class="text-h7">
                        <q-chip
                          outline
                          square
                          color="dark"
                          text-color="white"
                          icon="find_in_page"
                          label="资源内容"
                        />
                      </h2>
                      <div class="q-pa-md bg-grey-9 text-white">
                        <q-tree
                          dense
                          :nodes="item.resourceTree"
                          node-key="id"
                          label-key="name"
                          no-transition
                          default-expand-all
                          :dark="!isInvalid"
                        />
                      </div>
                    </div> -->
                  </article>
                </q-item-label>
              </q-item-section>
            </q-item>
            <div
              v-if="$q.platform.is.desktop"
              class="adsenseunitdetail q-pa-xs pc_adsense_dimension"
            >
              <!-- in-article-aquare2 -->
              <ins
                class="adsbygoogle pc_adsense_dimension"
                style="display: block"
                data-ad-client="ca-pub-3935005489954231"
                data-ad-slot="6650477400"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            <q-separator inset />
            <div v-if="$q.platform.is.desktop">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <q-btn
                      no-caps
                      :text-color="previousItem == null ? 'grey-4' : 'dark'"
                      fab-mini
                      icon="keyboard_arrow_left"
                      flat
                      :disable="previousItem == null"
                      :color="previousItem == null ? 'grey-4' : 'dark'"
                      dense
                      label-position="left"
                      :label="previousItem == null ? '' : previousItem.title"
                      :to="previousItem == null ? '' : `/d/${previousItem.id}`"
                      style="font-size: 0.9em"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-btn
                      no-caps
                      :text-color="nextItem == null ? 'grey-4' : 'dark'"
                      fab-mini
                      icon-right="keyboard_arrow_right"
                      flat
                      :disable="nextItem == null"
                      :color="nextItem == null ? 'grey-4' : 'dark'"
                      dense
                      label-position="right"
                      :label="nextItem == null ? '' : nextItem.title"
                      :to="nextItem == null ? '' : `/d/${nextItem.id}`"
                      style="font-size: 0.9em"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div v-else>
              <q-item class="q-pa-xs">
                <q-item-section>
                  <q-item-label>
                    <q-btn
                      no-caps
                      :text-color="previousItem == null ? 'grey-4' : 'dark'"
                      fab-mini
                      icon="keyboard_arrow_left"
                      flat
                      :disable="previousItem == null"
                      :color="previousItem == null ? 'grey-4' : 'dark'"
                      dense
                      label-position="left"
                      :label="previousItem == null ? '' : previousItem.title"
                      :to="previousItem == null ? '' : `/d/${previousItem.id}`"
                      class="text-caption"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-btn
                      no-caps
                      :text-color="nextItem == null ? 'grey-4' : 'dark'"
                      fab-mini
                      icon-right="keyboard_arrow_right"
                      flat
                      :disable="nextItem == null"
                      :color="nextItem == null ? 'grey-4' : 'dark'"
                      dense
                      label-position="right"
                      :label="nextItem == null ? '' : nextItem.title"
                      :to="nextItem == null ? '' : `/d/${nextItem.id}`"
                      class="text-caption"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-separator inset />

            <!-- <div class="adsenseunit q-pa-xs">
              <ins
                class="adsbygoogle"
                style="display: inline-block; width: 728px; height: 50px"
                data-ad-client="ca-pub-3935005489954231"
                data-ad-slot="4387276146"
              ></ins>
            </div> -->
            <div class="q-pt-sm" ref="scrollYunpanDetailtRef">
              <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->
              <q-infinite-scroll @load="onLoad" :offset="700" :initial-index="1" :disable="disable">
                <q-pull-to-refresh @refresh="refresh" no-mouse>
                  <q-item class="q-pb-none">
                    <div class="text-bold text-body2">最新回复</div>
                  </q-item>
                  <q-list dense class="bg-secondary">
                    <div v-bind:key="reply.id" v-for="reply in listData" class="bg-primary">
                      <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
                      <q-item dense v-ripple class="bg-secondary q-py-sm">
                        <q-item-section avatar top>
                          <q-avatar
                            v-if="reply.replyAvatar != '' && reply.replyAvatar != null"
                            :size="avatarSize"
                          >
                            <img
                              :src="reply.replyAvatar"
                              :alt="reply.replyAuther"
                              :width="avatarSize"
                              :height="avatarSize"
                            />
                          </q-avatar>
                          <q-avatar
                            :size="avatarSize"
                            :style="getAvatarColor(reply.replyAuther)"
                            text-color="white"
                            v-else
                          >
                            {{ getAvatarText(reply.replyAuther) }}</q-avatar
                          >
                        </q-item-section>
                        <q-item-section>
                          <q-item-label :lines="1" class="row YL__auther q-gutter-sm">
                            <div class="row flex-center">
                              <strong>{{ reply.replyAuther }}</strong>
                            </div>
                            <div class="row flex-center">
                              {{ reply.postDateStr }}
                            </div></q-item-label
                          >

                          <q-item-label class="YL__list_line_height">
                            <div
                              class="text-body2 Post-body break-all q-mt-sm"
                              v-html="reply.content"
                            ></div>

                            <!-- {{ reply.content }} -->
                          </q-item-label>
                        </q-item-section>
                        <!-- <q-item-section side top> </q-item-section> -->
                      </q-item>
                      <q-separator inset />
                    </div>
                  </q-list>
                </q-pull-to-refresh>

                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
                  </div>
                </template>
              </q-infinite-scroll>

              <div class="q-my-xs q-pa-lg flex flex-center bg-secondary gt-sm">
                <q-pagination
                  v-model="current"
                  :size="paginationSize"
                  color="dark"
                  :max="max"
                  :max-pages="maxPage"
                  :boundary-numbers="false"
                  :direction-links="true"
                  @update:model-value="pageNavigate"
                  :disable="$q.platform.is.mobile"
                >
                </q-pagination>
              </div>
            </div>
            <q-scroll-area style="height: 180px; width: 100%">
              <div>
                <q-item dense class="q-py-sm">
                  <q-item-section avatar top style="min-width: 30px">
                    <q-avatar :src="item.avatar" size="2.0em">
                      <img :src="userAvatar" :alt="item.auther" width="2.0em" height="2.0em" />
                    </q-avatar>
                  </q-item-section>
                  <!-- <q-item-section class="YL__auther">
                  {{ auther }}
                </q-item-section> -->
                  <q-item-section top class="YL__auther" style="max-width: 400px">
                    <q-item-label>
                      <q-form @submit="onSubmit" class="q-gutter-sm">
                        <div>
                          <q-input
                            dense
                            filled
                            v-model="replyContent"
                            placeholder="说点什么吧"
                            hide-bottom-space
                            type="textarea"
                            style="max-width: 300px"
                          />
                        </div>

                        <div class="q-mt-sm">
                          <q-btn
                            label="提交"
                            type="submit"
                            color="light-green"
                            size="xs"
                            :loading="isSubmiting"
                          >
                            <template v-slot:loading>
                              <q-spinner-facebook color="pink-4" />
                            </template>
                          </q-btn>
                        </div>
                      </q-form>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side v-if="$q.platform.is.desktop">
                    <div class="row">
                      <div class="justify-start q-mr-sm q-pt-xs">
                        <q-item-label class="text-caption column items-start"
                          >夸克最新资源腾讯文档</q-item-label
                        >
                        <q-item-label class="text-caption column items-start"
                          >扫右边二维码查看</q-item-label
                        >
                        <q-item-label class="text-caption column items-start"
                          >持续更新，建议收藏</q-item-label
                        >
                      </div>
                      <div>
                        <q-img
                          src="yunpan_doc.png"
                          alt="云盘资源文档实时更新"
                          width="130px"
                          height="130px"
                        />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </div>
            </q-scroll-area>
          </div>
          <q-separator inset />
          <div v-if="$q.platform.is.mobile" class="q-pa-sm q-my-xs">
            <div class="q-px-sm">猜你喜欢：</div>

            <q-carousel
              v-model="slide"
              transition-prev="slide-right"
              transition-next="slide-left"
              animated
              height="210px"
              class="rounded-borders"
            >
              <q-carousel-slide :name="1" class="column no-wrap q-pa-sm">
                <q-scroll-area class="fit">
                  <div class="row justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                    <div
                      class="full-height col-2"
                      v-for="recommend in recommendYunpanItems"
                      v-bind:key="recommend.id"
                    >
                      <router-link
                        :to="{
                          name: 'yunpanDetail',
                          params: { id: recommend.id },
                        }"
                      >
                        <q-img
                          class="rounded-borders"
                          fit="contain"
                          :src="recommend.thumbnaiImgs[0] != null ? recommend.thumbnaiImgs[0] : ''"
                        />
                      </router-link>

                      <q-item-label class="text-caption q-pt-sm" :lines="2">
                        {{ recommend.titleGpt == null ? recommend.title : recommend.titleGpt }}
                      </q-item-label>
                    </div>
                  </div>
                </q-scroll-area>
              </q-carousel-slide>
            </q-carousel>
          </div>
          <q-separator inset />

          <q-card class="q-px-sm flex-center q-ml-xs" flat>
            <q-item class="q-pt-sm justify-start items-center">
              <q-item-section avatar class="q-pr-sm">
                <!-- <q-icon name="o_info" color="indigo-7" /> -->
                <q-avatar size="2.0em">
                  <img src="david_avatar.png" alt="notice" width="2.0em" height="2.0em" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-caption text-weight-bold text-indigo-7"
                  ><span class="text-pink-4 text-weight-bolder text-subtitle1">好家当 </span
                  >已经汇聚上万T网友分享的资源，如果主贴和回复里的链接失效，请尝试在站内搜索框搜索</q-item-label
                >
              </q-item-section>
            </q-item>
            <!-- <q-card-section horizontal>
                <q-card-section> </q-card-section>
              </q-card-section> -->
            <q-separator />
            <q-card-section
              v-if="$q.platform.is.desktop"
              horizontal
              v-bind:class="{ hidden: weixin }"
              class="flex items-center justify-start"
            >
              <q-card-section class="q-mr-md">
                <div class="text-h6 text-indigo-7 text-bold q-mt-xs text-no-wrap">
                  更多最新资源，扫描右侧二维码
                </div>
                <!-- <div class="text-h6 text-pink-4 text-bold "></div> -->
                <div class="text-h6 text-pink-4 text-bold q-mt-xs">关注微信公众号</div>
                <div class="text-h5 text-grey-10 text-bold q-mt-xs">“老胡为你服务”</div>

                <div class="text-h6 text-indigo-7 text-bold q-mt-xs q-mb-xs">
                  &#9996;&#9996;实现看片自由
                </div>
              </q-card-section>

              <!-- <q-card-section> <div class="flex-center">==></div> </q-card-section> -->

              <q-card-section class="flex justif-start">
                <q-img
                  src="laohuweinifuwu.jpeg"
                  alt="wechat_code"
                  width="154.8px"
                  height="154.8px"
                />
              </q-card-section>
            </q-card-section>
            <q-card-section v-else>
              <div v-if="weixin">
                <!-- <q-item dense class="q-pt-none">
                  <q-item-section>
                    <q-item-label class="column flex-center">
                      <span class="text-caption text-pink-7 text-weight-medium">
                        经费告急，不差钱的大佬可以长按下方二维码赞赏下，好心人的名字将会定期出现在小站的感谢名单中。🙏
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="flex-center">
                  <q-img src="donate.jpg" alt="wechat_donate" width="265px" height="265px" />
                </q-item> -->
                <q-item dense class="q-pt-none">
                  <q-item-section>
                    <q-item-label class="column flex-center">
                      <span class="text-caption text-pink-7 text-weight-medium">
                        为您整理出了最新夸克资源，长按二维码查看腾讯文档，持续更新，建议收藏。🙏
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="flex-center">
                  <q-img
                    src="yunpan_doc.png"
                    alt="云盘资源文档实时更新"
                    width="265px"
                    height="265px"
                  />
                </q-item>
              </div>
              <div v-else>
                <q-item dense class="q-pt-none">
                  <q-item-section>
                    <q-item-label class="column flex-center">
                      <span class="text-caption text-pink-7 text-weight-medium">
                        为您整理出了最新夸克资源，微信扫一扫下面二维码查看腾讯文档或点击
                        <a
                          href="https://docs.qq.com/aio/DZVRuRE9xbXNyTnRZ?_t=1720519370146&p=bRhTesqRg6muumFvTXk3UO"
                          style="text-decoration: underline"
                          >最新网盘资源</a
                        >
                        。支持搜索，持续更新，建议收藏。🙏
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="flex-center">
                  <q-img
                    src="yunpan_doc.png"
                    alt="云盘资源文档实时更新"
                    width="200px"
                    height="200px"
                  />
                </q-item>
                <q-separator inset />
                <q-item dense class="q-pt-sm">
                  <q-item-section>
                    <q-item-label class="column flex-center">
                      <span class="text-h6 text-indigo-7 text-bold">更多最新资源，扫描二维码 </span>
                    </q-item-label>
                    <q-item-label class="column flex-center">
                      <span class="text-h6 text-pink-4 text-bold">关注微信公众号 </span>
                    </q-item-label>
                    <q-item-label class="column flex-center">
                      <span class="text-h5 text-grey-10 text-bold"> “老胡为你服务”</span>
                    </q-item-label>
                    <q-item-label class="column flex-center">
                      <span class="text-h6 text-indigo-7 text-bold text-italic"
                        >&#9996;&#9996;实现看片自由
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="flex-center">
                  <q-img src="laohuweinifuwu.jpeg" alt="wechat_code" width="150px" height="150px" />
                </q-item>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!-- 右边栏 -->
      <!-- <div class="col-3 gt-md"></div> -->
    </div>
  </q-page>
</template>
<style lang="sass">
.YL
  &__return
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 0.8em
    @media(min-width: $breakpoint-xs-max)
      font-size: 1.1em
      height: 0.8em
  &__wechat_img
    @media(max-width: $breakpoint-xs-max)
      width: 75%
    @media(min-width: $breakpoint-xs-max)
      width: 60%
  &__invalid_item
    text-decoration: line-through blue

.Post-body
  position: relative
  overflow: auto
  overflow-wrap: break-word
  max-width: 100%
.break-all
  word-break: break-all
  word-wrap: break-word
.Post-body img
  max-width: 100%
.break-all img
  max-width: 100%
.mobile_adsense_dimension
  height: 345px
  @media(min-width: 429px)
    height: 358px
  @media(max-width: 380px)
    height: 312px
.pc_adsense_dimension
  height: 280px
</style>
<!-- ins.adsbygoogle[data-ad-status="unfilled"]
  display: none !important -->

<script>
import 'src/config';
// import { Screen } from 'quasar';
import { Loading } from 'quasar';
import { mapState } from 'pinia';
import { useYunpanStore } from 'src/stores/yunpan';
// import { inject } from 'vue';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'YunpanItemDetail',
  data() {
    return {
      item: {},
      previousItem: {},
      nextItem: {},
      listData: [],
      host: global.config.domain,
      current: 1,
      max: 0,
      replyContent: '',
      // maxPage: Screen.gt.sm ? 6 : 4,
      // paginationSize: Screen.gt.sm ? '12px' : '9px',
      isListEnd: false,
      userAvatar: '/static/not_login_user.png',
      isBigScreen: false,
      // mobileBroswer: false,
      isInvalid: false,
      timer: null,
      isSubmiting: false,
      breadcrumb: '影视',
      categoryTo: '/category/影视',
      recommendYunpanItems: [],
    };
  },
  emits: ['need-login', 'logined'],

  computed: {
    ...mapState(useYunpanStore, {
      _detail: 'itemDetail',
      _previousItem: 'previousItem',
      _nextItem: 'nextItem',
      _replyList: 'replyList',
      _replyMax: 'replyMax',
      _contentStr: 'contentStr',
      _isInvalid: 'isInvalid',
      _userAgent: 'userAgent',
      _isReplyListEnd: 'isReplyListEnd',
      _recommendYunpanItems: 'recommendItemsWithThumbnails',
    }),
    maxPage() {
      return this.$q.platform.is.desktop ? 6 : 4;
    },
    paginationSize() {
      return this.$q.platform.is.desktop ? '12px' : '9px';
    },
    // imagefullwidth: function () {
    //   return {
    //     'full-width': this.isBigScreen ? false : true,
    //   };
    // },
    disable: function () {
      return this.$q.platform.is.desktop || this.isListEnd ? true : false;
    },

    getTagColor: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'pink-4';
        } else if (parameter == '动漫') {
          return 'blue-5';
        } else if (parameter == '图片') {
          return 'deep-orange-4';
        } else if (parameter == '游戏/软件') {
          return 'purple-4';
        } else if (parameter == '学习') {
          return 'lime-9';
        } else if (parameter == '音乐/音频') {
          return 'indigo-5';
        } else if (parameter == '日常') {
          return 'light-green-6';
        } else if (parameter == '求资源') {
          return 'blue-grey-6';
        } else if (parameter == '书籍') {
          return 'brown-5';
        } else {
          return 'teal-5';
        }
      };
    },
    getTagIcon: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'o_movie';
        } else if (parameter == '动漫') {
          return 'tv';
        } else if (parameter == '图片') {
          return 'o_image';
        } else if (parameter == '游戏/软件') {
          return 'o_sports_esports';
        } else if (parameter == '学习') {
          return 'o_school';
        } else if (parameter == '音乐/音频') {
          return 'o_music_note';
        } else if (parameter == '日常') {
          return 'nightlife';
        } else if (parameter == '求资源') {
          return 'help_outline';
        } else if (parameter == '书籍') {
          return 'o_book';
        } else {
          return 'o_eco';
        }
      };
    },
    getAvatarColor: function () {
      return (parameter) => {
        if (parameter == null || parameter == undefined) {
          return;
        }

        return 'background-color:#' + this.getHashCode(parameter, true).toString(16).substr(0, 6);
      };
    },
    getAvatarText: function () {
      return (parameter) => {
        if (parameter == null || parameter == undefined) {
          return;
        }
        return parameter.slice(0, 1);
      };
    },
    mobileBroswer: function () {
      let isMobile = this.$q.platform.is.mobile;
      console.log('isMobile = ' + isMobile);
      let isWeixin = this.isWeixin();
      console.log('isWeixin = ' + isWeixin);

      return isMobile && !isWeixin;
    },
    weixin: function () {
      return this.isWeixin();
    },
    noticefont: function () {
      return this.$q.platform.is.desktop ? 'text-subtitle1' : 'text-subtitle2';
    },
    avatarSize: function () {
      return this.$q.platform.is.desktop ? '2.7em' : '2.3em';
    },
  },
  setup() {
    console.log('YunpanDetail setup');
    const $q = useQuasar();
    let platform = '';
    if ($q.platform.is.mobile) {
      platform = 'mobile';
    } else {
      platform = 'pc';
    }
    // console.log('platform = ' + platform);
    const title = ref('好家当-最新网盘资源下载');
    const meta = reactive({
      description: {
        name: 'description',
        content:
          '好家当-最新百度网盘、夸克网盘、阿里云盘、UC网盘、迅雷云盘资源发布-4k、1080p高清影视、动漫、综艺节目、游戏、软件、音乐、学习资料、电子书、图片，网盘资源搜索，每天更新最新资源',
      },
      keywords: {
        name: 'keywords',
        content:
          '好家当,百度网盘资源下载,夸克网盘资源下载,阿里云盘资源下载,UC网盘资源下载,迅雷云盘资源下载,网盘资源搜索,最新网盘资源发布,4k,1080p',
      },
      applicationdevice: {
        name: 'applicable-device',
        content: platform,
      },

      ogtype: {
        property: 'og:type',
        content: 'article',
      },
      ogurl: {
        property: 'og:url',
        content: 'https://www.hjdang.com/list?q=',
      },
      ogtitle: {
        property: 'og:title',
        content: '好家当-最新网盘资源下载',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '好家当-最新百度网盘、夸克网盘、阿里云盘、UC网盘、迅雷云盘资源发布-4k、1080p高清影视、动漫、综艺节目、游戏、软件、音乐、学习资料、电子书、图片，网盘资源搜索，每天更新最新资源',
      },
      ogimage: {
        property: 'og:image',
        content: 'https://www.hjdang.com/hjd.png',
      },
      weibocreate: {
        name: 'weibo:webpage:create_at',
        content: '',
      },
      weiboupdate: {
        name: 'weibo:webpage:update_at',
        content: '',
      },
    });

    useMeta(() => {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title,
        titleTemplate: (title) => `${title.value}`,

        meta: meta,
      };
    });

    function setAnotherTitle(value) {
      title.value = value; // will automatically trigger a Meta update due to the binding
    }

    return {
      setAnotherTitle,
      meta,
      slide: ref(1),
    };
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('yunpanItemDetail page prefetch');
    var id = currentRoute.params.id.match(/\d+/i);
    console.log('id = ' + id);
    // if (currentRoute.params.id != id) {
    // }

    // 先把旧数据重置
    const myStore = useYunpanStore();
    myStore.itemDetail = {};
    myStore.replyList = [];
    myStore.contentStr = '';
    myStore.isInvalid = false;

    if (process.env.SERVER) {
      Loading.show();
      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      myStore.userAgent = ssrContext.req.headers['user-agent'];

      return myStore.getYunpanItemContent(id, redirect);
    }
    // const $q = useQuasar();
    // fetch data, validate route and optionally redirect to some other route...
  },
  activated() {
    console.log('yunpanItemDetail activated ');
    // this.getYunpanItemContent(this.$route.params.id);
  },
  created() {
    console.log('yunpanItemDetail created');
    console.log('this.$route.params.id = ' + this.$route.params.id);

    var id = this.$route.params.id.match(/\d+/i);
    // if (id != this.$route.params.id) {
    //   this.$router.push({ path: '/d/' + id });
    // }

    this.item = this._detail;
    this.breadcrumb = this.item.tag;
    this.categoryTo = '/category/' + this.breadcrumb;
    this.previousItem = this._previousItem;
    this.nextItem = this._nextItem;
    this.recommendYunpanItems = this._recommendYunpanItems;
    if (this.$q.platform.is.mobile) {
      if (
        this.previousItem != null &&
        this.previousItem.title != undefined &&
        this.previousItem.title.length > 8
      ) {
        this.previousItem.title = this.previousItem.title.substr(0, 7) + '..';
      }
      if (
        this.nextItem != null &&
        this.nextItem.title != undefined &&
        this.nextItem.title.length > 8
      ) {
        this.nextItem.title = this.nextItem.title.substr(0, 7) + '..';
      }
    }
    this.listData = this._replyList;
    this.max = this._replyMax;
    this.isListEnd = this._isReplyListEnd;
    this.isInvalid = this._isInvalid;

    if (Object.keys(this.item).length > 0) {
      this.setAnotherTitle(this.item.title + '-阿里云盘夸克网盘-好家当');
      // this.title = this._detail.title;
      // console.log(this._contentStr);
      this.meta.keywords.content = this.item.title + ',阿里云盘,夸克网盘,资源,下载';
      this.meta.ogtitle.content = this.item.title + '-阿里云盘夸克网盘 - 好家当';
      if (this._contentStr) {
        this.meta.description.content = this._contentStr + '-阿里云盘,夸克网盘,资源,下载';
        this.meta.ogdescription.content = this._contentStr + '-阿里云盘,夸克网盘,资源,下载';
      } else {
        this.meta.description.content = this.item.title + '-阿里云盘,夸克网盘,资源,下载';
        this.meta.ogdescription.content = this.item.title + '-阿里云盘,夸克网盘,资源,下载';
      }
    }

    this.meta.ogurl.content = 'https://www.hjdang.com/d/' + id;

    this.meta.weibocreate.content = new Date();
    this.meta.weiboupdate.content = new Date();
  },
  beforeMount() {
    console.log('yunpanItemDetail before mounted');
    this.$axios.post(`${global.config.domain}/user/islogin`, {}).then((res) => {
      console.log(res.data.data);
      if (res.data.data == true) {
      } else {
        //未登陆的话
        if (this.isWeixin()) {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/auth/${this.$route.params.id}&response_type=code&scope=snsapi_userinfo&state=yunpanItem#wechat_redirect`;
        } else {
          // const $q = useQuasar();
          // if (this.$q.platform.is.desktop) {
          //   if (!this.isInvalid) {
          //     //通知父组件
          //     this.$emit('need-login', this.$route.params.id);
          //   }
          // }
          // else {
          //   setTimeout(() => {
          //     this.mobileBroswer = true;
          //   }, 2000);
          // }
          // this.$router.push({
          //   path: '/yunpan/list',
          //   query: { q: '', idForLogin: this.$route.params.id },
          // });
        }
      }
    });
  },

  mounted() {
    console.log('yunpanItemDetail mounted');

    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
    // 详情页插入广告
    // if (process.env.PROD) {
    //   window.AdverDetailInsert = true;
    //   setTimeout(function () {
    //     window.TencentGDT.NATIVE.loadAd('4054888219125381');
    //   }, 100);
    // }

    this.$bus.on('logined', function (itemId) {
      console.log('从yunpan detail页面已登陆' + itemId);
      window.location.href = `https://www.hjdang.com/d/` + itemId;

      // this.$router.push({
      //   path: '/yunpan/d/' + itemId,
      // });
    });

    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');

      if (userInfo !== undefined && userInfo !== null) {
        if (userInfo.headimgurl != null && userInfo.headimgurl != '') {
          this.userAvatar = userInfo.headimgurl;
        }
      }
      // this.userAvatar = this.$q.localStorage.getItem('userInfo').headimgurl;
    }
    if (Object.keys(this.item).length === 0) {
      console.log(this.$route.params.id);
      this.$q.loading.show({
        delay: 400, // ms
      });
      var id = this.$route.params.id.match(/\d+/i);
      this.getYunpanItemContent(id);
    }
    //启动谷歌unit广告
    if (window.adsbygoogle == undefined) {
      this.timer = setInterval(() => {
        console.log('adsbygoogle delay 400ms - detail');
        if (window.adsbygoogle) {
          window.clearInterval(this.timer); //清除定时器
          let adsenseUnitLength = document.getElementsByClassName('adsenseunitdetail');
          for (let i = 0; i < adsenseUnitLength.length; i++) {
            (adsbygoogle = window.adsbygoogle || []).push({});
          }
          console.log('detail adsense loaded');
        }
      }, 400);
    } else {
      let adsenseUnitLength = document.getElementsByClassName('adsenseunitdetail');
      for (let i = 0; i < adsenseUnitLength.length; i++) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
      console.log('detail adsense loaded');
    }

    // if (window.AdverDetailInsert != undefined && window.AdverDetailInsert != null) {
    //   window.TencentGDT.NATIVE.renderAd(window.AdverDetailInsert, 'yunpanDetailAdvert');
    //   window.TencentGDT.NATIVE.loadAd('4054888219125381');
    // } else {
    //   //等待1s后重新展示
    //   setTimeout(() => {
    //     if (window.AdverDetailInsert != undefined && window.AdverDetailInsert != null) {
    //       window.TencentGDT.NATIVE.renderAd(window.AdverDetailInsert, 'yunpanDetailAdvert');
    //       window.TencentGDT.NATIVE.loadAd('4054888219125381');
    //     }
    //   }, 1000);
    //   console.log('wait 1s AdverDetailInsert');
    // }
  },

  unmounted() {
    console.log('yunpanItemDetail unmounted');
  },
  methods: {
    getReplyList() {
      this.$q.loading.show({
        delay: 100, // ms
      });
      this.$axios
        .post(`${global.config.domain}/yunpan/reply/list`, {
          page: this.current,
          itemId: this.item.id,
          isInvalid: this.isInvalid,
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(this.isBigScreen);

          console.log(res.data);
          if (res.data.code < 0) {
            this.$q.notify({
              type: 'negative',
              icon: 'warning',
              message: `${res.data.msg}`,
            });
          } else {
            this.listData = res.data.data.records;
            if (res.data.data.records.length < 30) {
              this.isListEnd = true;
            } else {
              this.isListEnd = false;
            }
          }
          this.$q.loading.hide();
        });
    },
    getYunpanItemContent(id) {
      this.$axios.post(`${global.config.domain}/yunpan/item/public/${id}`).then((res) => {
        if (res.data.code < 0) {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'negative',
            icon: 'warning',
            message: `${res.data.msg}`,
          });
          this.$router.push({ path: '/list', query: { q: '' } });
        } else {
          this.item = res.data.data.item;
          this.breadcrumb = this.item.tag;
          this.categoryTo = '/category/' + this.breadcrumb;
          this.isInvalid = res.data.data.invalid;
          this._contentStr = res.data.data.contentStr;
          this.previousItem = res.data.data.previousItem;
          this.nextItem = res.data.data.nextItem;
          this.recommendYunpanItems = res.data.data.recommendYunpanItems;
          if (this.$q.platform.is.mobile) {
            if (
              this.previousItem != null &&
              this.previousItem.title != undefined &&
              this.previousItem.title.length > 8
            ) {
              this.previousItem.title = this.previousItem.title.substr(0, 7) + '..';
            }
            if (
              this.nextItem != null &&
              this.nextItem.title != undefined &&
              this.nextItem.title.length > 8
            ) {
              this.nextItem.title = this.nextItem.title.substr(0, 7) + '..';
            }
          }
          this.listData = res.data.data.firstReplyPage.records;
          this.max = Math.ceil(
            res.data.data.firstReplyPage.total / res.data.data.firstReplyPage.size
          );
          // console.log(this.item);
          if (this.item == null) {
            this.$router.push({ path: '/404' });
          }
          if (this.listData.length < 30) {
            this.isListEnd = true;
          } else {
            this.isListEnd = false;
          }
          this.setAnotherTitle(this.item.title + ' - 阿里云盘夸克网盘 - 好家当');
          // this.title = this._detail.title;
          this.meta.keywords.content = this.item.title + ',阿里云盘,夸克网盘,资源,下载';
          this.meta.ogtitle.content = this.item.title + ' - 阿里云盘夸克网盘';
          if (this._contentStr) {
            this.meta.description.content = this._contentStr + ' - 阿里云盘,夸克网盘,资源,下载';
            this.meta.ogdescription.content = this._contentStr + ' - 阿里云盘,夸克网盘,资源,下载';
          } else {
            this.meta.description.content = this.item.title + ' - 阿里云盘,夸克网盘,资源,下载';
            this.meta.ogdescription.content = this.item.title + ' - 阿里云盘,夸克网盘,资源,下载';
          }

          this.$q.loading.hide();
        }
      });
    },
    isWeixin() {
      let ua;
      if (process.env.CLIENT) {
        ua = window.navigator.userAgent.toLowerCase();
      } else {
        ua = this._userAgent.toLowerCase();
      }
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    onSubmit() {
      this.isSubmiting = true;

      this.$axios
        .post(`${global.config.domain}/yunpan/resource/reply`, {
          itemId: this.item.id,
          reply: this.replyContent,
        })
        .then((res) => {
          if (res.data.code < 0) {
            this.isSubmiting = false;

            if (res.data.code == -102) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/auth/${this.item.id}&response_type=code&scope=snsapi_userinfo&state=yunpanItem#wechat_redirect`;
              } else {
                this.$emit('need-login');
              }
            } else {
              this.$q.notify({
                type: 'negative',
                icon: 'warning',
                message: `${res.data.msg}`,
              });
            }
          } else {
            this.replyContent = '';
            this.onLoad(this.current, function (a) {
              a.isSubmiting = false;
            });
          }
        });
    },
    //向下划动load页面
    onLoad(index, done) {
      if (this.isBigScreen && done == null) {
        return;
      }
      setTimeout(() => {
        console.log('page = .....' + index);
        this.current = index;
        this.$axios
          .post(`${global.config.domain}/yunpan/reply/list`, {
            page: index,
            itemId: this.item.id,
            isInvalid: this.isInvalid,
          })
          .then((res) => {
            if (res.data.data.records.length < 30) {
              this.isListEnd = true;
            } else {
              this.isListEnd = false;
            }
            //过滤页面上重复的
            const filters = res.data.data.records.filter((item) => {
              let isDupliate = false;
              for (let key in this.listData) {
                if (this.listData[key].id == item.id) {
                  console.log('this id is duplicate,' + item.id);
                  isDupliate = true;
                  break;
                }
              }
              if (isDupliate) {
                return false;
              } else {
                return true;
              }
            });
            filters.forEach((item) => {
              this.listData.push(item);
            });

            console.log(this.listData);
            if (done != null) {
              done(this);
            }
          });
      }, 100);
    },
    //列表下拉刷新
    refresh(done) {
      setTimeout(() => {
        this.getReplyList();
        done();
      }, 100);
    },
    getHashCode(str, caseSensitive) {
      if (str == null || str == undefined) {
        return;
      }
      if (!caseSensitive) {
        str = str.toLowerCase();
      }
      var hash = 1315423911,
        i,
        ch;
      for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= (hash << 5) + ch + (hash >> 2);
      }
      return hash & 0x7fffffff;
    },
    //桌面端的分页
    pageNavigate() {
      console.log('reply pageNavigate');
      this.$axios
        .post(`${global.config.domain}/yunpan/reply/list`, {
          page: this.current,
          itemId: this.item.id,
          isInvalid: this.isInvalid,
        })
        .then((res) => {
          console.log(res.data.data.records);
          this.listData = res.data.data.records;
          this.max = Math.ceil(res.data.data.total / res.data.data.size);
        });
    },
  },
};
</script>

<!-- ins.adsbygoogle div
  display: none !important
ins.adsbygoogle[data-ad-status="unfilled"] div
  display: block -->
