import general.sql.Book;
import general.sql.BookRepositorySQL;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;


public class HtmlPage {

    public static void main(String[] args) throws IOException, SQLException {

        String myCurrentDir = System.getProperty("user.dir")
                + "/src"
                + File.separator
                + System.getProperty("sun.java.command")
                .substring(0, System.getProperty("sun.java.command").lastIndexOf("."))
                .replace(".", File.separator)
                + "/";

        File htmlTemplateFile = new File(myCurrentDir + "books_sql.html");
        String htmlString = FileUtils.readFileToString(htmlTemplateFile);

        BookRepositorySQL bookRepositorySQL = new BookRepositorySQL();
        ArrayList<Book> books = bookRepositorySQL.getAll();

        String title = "Test";
        String table =
                " <table BORDER=\"2\" style=\"width:50%\" id=\"t01\">\n"
                        + "<tr>\n" +
                        "<th>id</th>\n" +
                        "<th>title</th>\n" +
                        "<th>price</th>\n" +
                        //"<th>publisher</th>" +
                        "</tr>\n";
        HashMap<Integer, String> fileMap = new HashMap<Integer, String>() {{
            put(4, "bible");
        }};
        int i = 0;
        for (Book b : books) {
            table += "<tr>\n";
            table += "<td>" + b.getId() + "</td>\n";
            table += "<td>" + "<a href=\"" + fileMap.get(b.getId()) + ".html\">" + b.getTitle() + "</a>" + "</td>\n";
            table += "<td>" + b.getPrice() + "</td>\n";
            //table+="<td>" + b.getPublisher() + "</td>";
            table += "</tr>\n";
            //i++;
        }
        htmlString = htmlString.replace("$title", title);
        htmlString = htmlString.replace("$table", table);
        File newHtmlFile = new File(myCurrentDir + "new.html");
        FileUtils.writeStringToFile(newHtmlFile, htmlString);
    }
}
