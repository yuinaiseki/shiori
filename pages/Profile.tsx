import { useTheme } from "../assets/themes/themeContext";
import { globalStyles } from "../assets/styles";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, ActivityIndicator } from "react-native";
import { useProfile } from "./contexts/ProfileContext";
import { useLikedBooks } from "./contexts/LikedBooksContext";
import { calculateAestheticProfile } from "../utils/colorUtils";
import { useState } from "react";
import { Edit2, X, Check } from 'lucide-react-native';

export default function Profile() {
  const { theme } = useTheme();
  const styles = globalStyles(theme);
  const { profile, loading, updateProfile } = useProfile();
  const { likedBooks } = useLikedBooks();
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <View style={styles.temp_msg}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.temp_msg}>
        <Text style={styles.text}>Unable to load profile</Text>
      </View>
    );
  }

  const aestheticProfile = calculateAestheticProfile(likedBooks);

  const handleEditPress = () => {
    setEditUsername(profile.username);
    setEditBio(profile.bio || '');
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await updateProfile({
        username: editUsername,
        bio: editBio,
      });
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={[styles.header, { flex: undefined, paddingBottom: 20 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            {/* Avatar */}
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.bgSecondary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
              {profile.avatar_url ? (
                <Image 
                  source={{ uri: profile.avatar_url }} 
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              ) : (
                <Text style={[styles.heading, { fontSize: 32 }]}>
                  {profile.username.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>

            {/* Username */}
            <Text style={[styles.heading, { fontSize: 24, marginBottom: 8 }]}>
              {profile.username}
            </Text>

            {/* Bio */}
            <Text style={[styles.text, { marginBottom: 15, lineHeight: 20 }]}>
              {profile.bio || 'No bio yet'}
            </Text>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            onPress={handleEditPress}
            style={{
              backgroundColor: theme.bgSecondary,
              padding: 12,
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <Edit2 size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: theme.textSecondary + '30',
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.heading, { fontSize: 20 }]}>{likedBooks.length}</Text>
            <Text style={[styles.text, { fontSize: 14 }]}>Saved</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.heading, { fontSize: 20 }]}>
              {aestheticProfile.topAesthetics.length}
            </Text>
            <Text style={[styles.text, { fontSize: 14 }]}>Aesthetics</Text>
          </View>
        </View>
      </View>

      {/* Aesthetic Profile Section */}
      <View style={{ padding: 20 }}>
        <Text style={[styles.heading, { fontSize: 20, marginBottom: 15 }]}>
          Your Aesthetic
        </Text>

        {likedBooks.length === 0 ? (
          <View style={{
            backgroundColor: theme.bgSecondary,
            padding: 30,
            borderRadius: 12,
            alignItems: 'center',
          }}>
            <Text style={[styles.text, { textAlign: 'center', opacity: 0.7 }]}>
              Like some books to discover your aesthetic profile!
            </Text>
          </View>
        ) : (
          <>
            {/* Color Palette */}
            <View style={{
              flexDirection: 'row',
              marginBottom: 20,
              gap: 10,
              flexWrap: 'wrap',
            }}>
              {aestheticProfile.colorPalette.map((color, index) => (
                <View
                  key={index}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: color,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: theme.border || theme.textSecondary,
                  }}
                />
              ))}
            </View>

            {/* Top Aesthetics */}
            <Text style={[styles.text, { fontSize: 16, marginBottom: 12, fontWeight: '600' }]}>
              Top Aesthetics
            </Text>
            {aestheticProfile.topAesthetics.map((aesthetic, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                  backgroundColor: theme.bgSecondary,
                  padding: 15,
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: aesthetic.color,
                    borderRadius: 8,
                    marginRight: 15,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '600' }]}>
                    {aesthetic.name}
                  </Text>
                  <Text style={[styles.text, { fontSize: 14, opacity: 0.7 }]}>
                    {aesthetic.count} books
                  </Text>
                </View>
                <View style={{
                  backgroundColor: theme.bg,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                }}>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    {Math.round((aesthetic.count / likedBooks.length) * 100)}%
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { maxHeight: '60%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <X size={30} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.text, { marginBottom: 8, fontSize: 16, fontWeight: '600' }]}>
                Username
              </Text>
              <TextInput
                style={[
                  styles.text,
                  {
                    backgroundColor: theme.bgSecondary,
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 20,
                  }
                ]}
                value={editUsername}
                onChangeText={setEditUsername}
                placeholder="Enter username"
                placeholderTextColor={theme.textSecondary}
              />

              <Text style={[styles.text, { marginBottom: 8, fontSize: 16, fontWeight: '600' }]}>
                Bio
              </Text>
              <TextInput
                style={[
                  styles.text,
                  {
                    backgroundColor: theme.bgSecondary,
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 20,
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }
                ]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="Tell us about yourself..."
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity
                onPress={handleSaveProfile}
                disabled={saving}
                style={{
                  backgroundColor: theme.text,
                  padding: 15,
                  borderRadius: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={theme.bg} />
                ) : (
                  <>
                    <Check size={20} color={theme.bg} />
                    <Text style={{ color: theme.bg, fontSize: 16, fontWeight: '600' }}>
                      Save Changes
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}