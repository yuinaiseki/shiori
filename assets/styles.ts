import { Bold } from "lucide-react-native";
import Themes from "./themes/themes";
import { StyleSheet } from "react-native";

export const globalStyles = (theme: any) => StyleSheet.create({

    // for app.tsx
    container: {                                                
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.bgSecondary,
    },
    temp_msg:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    page: {
        flex: 18,
    },
    //for explore page header
    header: {
        flex: 2,
        flexDirection: "column",
        backgroundColor: theme.bg,
        //borderWidth: 5,
        //borderColor: Themes.light.border,
        paddingTop: 30,

        padding: 15,
    },
    name: {
        flex: 10,
        margin: 10,
    },
    heading:{
        color: theme.heading,
        //fontWeight: "bold",
        fontSize: 30,
        fontFamily: "./fonts/IMFellDoublePica-Regular.ttf"
    },
    mode: {
        flex: 1,
    },
    mode_container: {
        height: 55,
        aspectRatio: 1,
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: theme.bgSecondary,
    },
    sub_heading:{
        flex: 5,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 30,
        alignItems: "center"

    },
    search: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 0,
        borderRadius: 30,
        backgroundColor: theme.bgSecondary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: {
        flex: 1,
    },
    filterButton: {
        backgroundColor: theme.bgSecondary,
        padding: 5,
        borderRadius: 12,
        borderWidth: 0,
        borderColor: theme.border || theme.textSecondary,
    },

    body: {
        flex: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    // for all pages: footer/navigation bar
    footer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: theme.bg,
        // borderWidth: 5,
        //borderColor: Themes.light.border,
    },

    text: {
        color: theme.textSecondary,
        fontSize: 16,
    },
    navButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 10,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: theme.bg,
        borderRadius: 20,
        padding: 20,
        width: '85%',
        maxHeight: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    genreOption: {
        backgroundColor: theme.bgSecondary,
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 0,
        borderColor: theme.border || theme.textSecondary,
    },
    genreOptionSelected: {
        backgroundColor: theme.bgSecondary,
        borderWidth: 3,
        borderColor: theme.text,
    },
    genreText: {
        color: theme.textSecondary,
        fontSize: 16,
    },
    genreTextSelected: {
        fontWeight: 'bold',
    },
});

