import React, { useEffect, useState } from 'react'
import CommunityLayout from '../components/layout/community'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import SubmitButton from '../components/common/SubmitButton'
import type { CommunityNavigationProp, CommunityRouteProp } from '../types/RootStackParamList'
import axios from 'axios'
import type { CommentsData, UserPost } from '../types/Community'
import FormattedDate from '../components/common/FormattedDate'
import RenderHtml from 'react-native-render-html'
import Comment from '../components/community/Comment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Post = (): JSX.Element => {
  const [post, setPost] = useState<UserPost | null>(null)
  const [commentContent, setCommentContent] = useState('')
  const navigation = useNavigation<CommunityNavigationProp>()
  const goBack = (): void => {
    navigation.goBack()
  }
  const route = useRoute<CommunityRouteProp>()
  const { postId } = route.params
  const fetchPost = async (postId: number | undefined): Promise<void> => {
    try {
      const response = await axios.get<UserPost>(`http://3.38.185.224:8000/api/posts/${postId}`)
      console.log(response.data)
      setPost(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    void fetchPost(postId)
  }, [])
  const updateComments = (newComment: CommentsData) => {
    setPost((prevPost) => {
      console.log('prevPost:', prevPost)
      return {
        ...prevPost,
        comments: [...prevPost.comments, newComment]
      }
    })
  }
  const handleCommentSubmit = async (): Promise<void> => {
    if (!commentContent.trim()) return
    const postData = {
      post_id: postId,
      content: commentContent
    };
    const token = await AsyncStorage.getItem('authToken')
    try {
      const response = await axios.post(`http://3.38.185.224:8000/api/posts/${postId}/comments`, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('댓글 작성 성공:', response.data)
      setCommentContent('')
      updateComments(response.data)
    } catch (error) {
      console.error('댓글 작성 실패:', error)
    }
  }

  const navigateToEditPost = (postId: number): void => {
    navigation.navigate('EditPost', { postId })
  }

  const deletePost = async (postId: number | undefined): Promise<void> => {
    // 사용자에게 삭제를 확인하는 Alert 창을 띄웁니다.
    Alert.alert(
      "게시글 삭제", // Alert 제목
      "이 게시글을 삭제하시겠습니까?", // Alert 메시지
      [
        {
          text: "취소",
          onPress: () => console.log("삭제 취소됨"), // '취소'를 누를 경우 실행될 함수
          style: "cancel"
        },
        { 
          text: "삭제", 
          onPress: async () => { // '삭제'를 누를 경우 실행될 함수
            const token = await AsyncStorage.getItem('authToken');
            try {
              const response = await axios.delete(`http://3.38.185.224:8000/api/posts/${postId}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              console.log('게시글 삭제 성공:', response.data);
              navigation.goBack();
            } catch (error) {
              console.error('게시글 삭제 실패:', error);
            }
          }
        }
      ],
      { cancelable: false } // 백 버튼으로 Alert 창을 닫지 못하게 합니다.
    );
  }

  return (
    <CommunityLayout title='파충류 이모저모' subtitle='주인님 같이 놀아요!'>
      <View style={styles.inner}>
        <View style={styles.postsContainer}>
          <TouchableOpacity onPress={goBack} style={styles.goToBackButton}>
            <MaterialIcons name="arrow-back" size={16} color="#fff" />
            <Text style={styles.goToBackTitle}>뒤로가기</Text>
          </TouchableOpacity>
          {/* 제목, 정보 */}
          <Text style={styles.titleFont}>{post?.title}</Text>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>by </Text>
              <Text style={styles.goToBackTitle}>{post?.user.nickname}</Text>
            </View>
            <View style={[styles.infoText, styles.category]}>
              <Text style={styles.commonFont}>{post?.category.name}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <FormattedDate dateString={post?.created_at} />
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="remove-red-eye" size={16} color="#fff" />
              <Text style={styles.commonFont}>{post?.views}</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="chat" size={16} color="#fff" />
              <Text style={styles.commonFont}>{post?.comments.length}</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.commonFont}>{post?.likes}</Text>
            </View>
          </View>
          {/* 내용 */}
          <View style={{ width: '100%', height: 'auto', marginVertical: 24 }}>
            <RenderHtml
                contentWidth={400}
                source={{
                  html: `<div style="color: white; font-size: 16px;">${post?.content}</div>`
                }}
                tagsStyles={{
                  p: { marginVertical: 0 },
                  img: { width: '300px', height: '200px' }
                }}
              />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <SubmitButton
            label="게시글 수정"
            onPress={() => { navigateToEditPost(post?.id) }}
            buttonStyle={styles.editButton}
            textStyle={{ fontSize: 18, fontWeight: '500' }}
          />
          <SubmitButton
            label="게시글 삭제"
            onPress={() => { deletePost(post?.id) }}
            buttonStyle={styles.editButton}
            textStyle={{ fontSize: 18, fontWeight: '500' }}
          />
        </View>
        {/* 댓글 수 */}
        {post?.comments !== undefined && post?.comments.length > 0
          ? <>
              <Text style={styles.titleFont}>댓글 {post?.comments.length}개</Text>
              <View style={styles.commentContainer}>
                {post?.comments
                  .filter(comment => !comment.parent_comment_id)
                  .map(comment => (
                    <Comment key={comment.id} comment={comment} allComments={post.comments} postId={post.id} updateComments={updateComments} />
                  ))}
              </View>
            </>
          : <Text style={styles.titleFont}>댓글이 없습니다.</Text>
        }
        {/* 댓글 */}

        {/* 댓글 작성란 */}
        <View style={styles.commentInput}>
          <TextInput
            value={commentContent}
            onChangeText={setCommentContent}
            placeholder="댓글을 작성해주세요"
            placeholderTextColor='#fff'
            style={styles.commonFont}
          />
        </View>
        {/* 작성 버튼 */}
        <SubmitButton
          label="댓글작성"
          onPress={handleCommentSubmit}
          buttonStyle={styles.submitButton}
          textStyle={{ fontSize: 18, fontWeight: '500' }}
        />
      </View>
    </CommunityLayout>
  )
}

const styles = StyleSheet.create({
  inner: {
    marginHorizontal: 16
  },
  titleFont: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  postsContainer: {
    backgroundColor: '#1C5B20',
    flex: 1,
    padding: 12,
    marginVertical: 32
  },
  goToBackButton: {
    width: '25%',
    flexDirection: 'row',
    marginBottom: 24
  },
  goToBackTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 12
  },
  infoText: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentInput: {
    borderColor: '#39823E',
    borderWidth: 1.5,
    height: 200,
    padding: 12,
    marginTop: 24,
    borderRadius: 8
  },
  submitButton: {
    backgroundColor: '#39823E',
    width: '100%',
    paddingVertical: 4
  },
  commentContainer: {
    height: 'auto',
    padding: 12,
    marginTop: 24,
    borderRadius: 8,
    borderColor: '#39823E',
    borderWidth: 2
  },
  comment: {
    marginTop: 12
  },
  category: {
    backgroundColor: '#39823E',
    padding: 4,
    borderRadius: 5
  },
  editButton: {
    backgroundColor: '#39823E',
    width: '48%',
    paddingVertical: 4
  }
})

export default Post
