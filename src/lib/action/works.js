'use server';

import { tokenFetch } from '@/lib/utils/fetchClient';

export async function createWorkAction(challengeId, content) {
  try {
    const numericId = parseInt(challengeId, 10);

    if (isNaN(numericId)) {
      throw new Error('유효하지 않은 챌린지 ID입니다.');
    }

    const response = await tokenFetch(`/challenges/${numericId}/works`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateWorkAction(workId, content) {
  try {
    const response = await tokenFetch(`/works/${workId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function toggleLikeAction(workId, isLiked) {
  try {
    const method = isLiked ? 'DELETE' : 'POST';

    const response = await tokenFetch(`/works/${workId}/likes/`, {
      method,
    });

    return {
      success: true,
      isLiked: !isLiked,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createCommentAction(workId, content) {
  try {
    const response = await tokenFetch(`/works/${workId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateCommentAction(commentId, content) {
  try {
    const response = await tokenFetch(`/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCommentAction(commentId) {
  try {
    await tokenFetch(`/comments/${commentId}`, {
      method: 'DELETE',
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteWorkAction(workId, reason = null) {
  try {
    const options = {
      method: 'DELETE',
    };

    if (reason) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify({ reason });
    }

    await tokenFetch(`/works/${workId}`, options);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
